import { IdleSessionTimeout } from 'idle-session-timeout';

import OfflineTokenGen from './offlineTokenGen';

/**
 * IDLE SESSION TIMEOUT
 */
const session = new IdleSessionTimeout(5 * 60 * 1000);
const otg = new OfflineTokenGen();

const getTokenStore = () => {
  return localStorage.getItem('token') || null;
};

const getTokenData = (token: string) => {
  const data = otg.read(token) || null;
  return data;
};

const generateTokenToStore = (user: {
  IdUser: string;
  name: string;
  login: string;
  password: string;
}) => {
  const getToken = getTokenStore();
  let tokenIsValid = false;

  if (getToken) {
    const checkValidation = getTokenData(getToken);
    if (checkValidation) {
      tokenIsValid = true;
    }
  }
  if (!tokenIsValid) {
    const newToken = otg.generate(user);
    localStorage.setItem('token', newToken);
  }
};

const timeOutAt = session.getTimeLeft();

const onTimeOutChange = (callback: (time: number) => void) => {
  session.onTimeLeftChange = timeLeft => {
    const t = Math.round(timeLeft / 1000);

    callback(t);
  };
};

const isMultipleof30 = (n: number) => {
  while (n > 0) n = n - 30;

  if (n == 0) return true;

  return false;
};

const stop = () => {
  session.dispose();
  localStorage.removeItem('token');
};

const start = (
  { $router, $route },
  user?: { IdUser: string; name: string; login: string; password: string }
) => {
  const token = localStorage.getItem('token') || null;

  let isStarted = false;

  if (token) {
    const tokenData = getTokenData(token);
    isStarted = true;

    if (!tokenData && $route.path !== '/' && user.IdUser) {
      generateTokenToStore(user);
      session.dispose();
    } else if (tokenData && $route.path !== '/') {
      $router.push('/');
      session.dispose();
    } else if (tokenData && $route.path === '/') {
      $router.push('/main');
    } else if (!tokenData && $route.path === '/' && user.IdUser) {
      generateTokenToStore(user);
      $router.push('/main');
    } else isStarted = false;
  } else if (!token && $route.path === '/' && user.IdUser) {
    generateTokenToStore(user);
    isStarted = true;
    $router.push('/main');
  }
  if (isStarted) {
    session.onTimeOut = () => {
      if (!getTokenData(token)) $router.push('/');
      isStarted = true;
      stop();
    };

    session.onTimeLeftChange = time => {
      const t = Math.round(time / 1000);
      if (isMultipleof30(t)) console.log(t);
    };
    session.start();
  }

  console.log('started: ', isStarted);
  return isStarted;
};

export default {
  getTokenStore,
  onTimeOut: session.onTimeOut,
  isMultipleof30,
  generateTokenToStore,
  start,
  getTokenData,
  onTimeOutChange,
  timeOutAt,
  stop
};
