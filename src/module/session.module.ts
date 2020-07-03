import { IdleSessionTimeout } from 'idle-session-timeout';

import OfflineTokenGen from './offlineTokenGen';
import { time } from 'console';

const Store = require('electron-store');
const store = new Store();

/**
 * IDLE SESSION TIMEOUT
 */
const session = new IdleSessionTimeout(5 * 60 * 1000);
const otg = new OfflineTokenGen();

const getTokenData = (token: string) => {
  const data = otg.read(token);
  return data;
};

const generateTokenToStore = (user: {
  IdUser: string;
  name: string;
  login: string;
  password: string;
}) => {
  const getToken = store.get('token');
  let tokenIsValid = false;

  if (getToken) {
    const checkValidation = getTokenData(getToken);
    if (checkValidation) {
      tokenIsValid = true;
    }
  }
  if (!tokenIsValid) {
    const newToken = otg.generate(user);
    store.set('token', newToken);
  }
};

const timeOutAt = session.getTimeLeft();

const onTimeOutChange = (callback: (time: number) => void) => {
  session.onTimeLeftChange = timeLeft => {
    callback(timeLeft);
  };
};

const onTimeOut = (callback: (isExpired: boolean) => void) =>
  (session.onTimeOut = () => {
    const token = store.get('token');
    let tokenIsExpired = true;

    if (token) {
      const check = getTokenData(token);
      if (check) {
        tokenIsExpired = false;
      }
    } else {
      console.log('Not have a token');
    }
    console.log('time out');

    callback(tokenIsExpired);
  });

const start = (
  onTimeOutCallback?: (tokenIsExpired: boolean) => void,
  onTimeOutChangeCallback?: (time: number) => void
) => {
  const token = store.get('token') || null;

  let isStarted = false;

  if (token) {
    const data = getTokenData(token);

    if (data) {
      onTimeOut(isExp => {
        if (isExp) this.$router.push('/');
        else this.$router.push('/main');
        if (onTimeOutCallback) onTimeOutCallback(isExp);
      });

      if (onTimeOutChangeCallback)
        onTimeOutChange(t => {
          onTimeOutChangeCallback(t);
        });
      session.start();
      isStarted = true;
    } else console.log('Expired token!');
  } else console.log('Not have a token');
  return isStarted;
};

const stop = () => {
  session.dispose();
};

const isMultipleof30 = (n: number) => {
  while (n > 0) n = n - 30;

  if (n == 0) return true;

  return false;
};

export default {
  isMultipleof30,
  generateTokenToStore,
  start,
  getTokenData,
  onTimeOutChange,
  timeOutAt,
  onTimeOut,
  stop
};
