import { IdleSessionTimeout } from 'idle-session-timeout';
import { Router } from 'src/router';

/**
 * IDLE SESSION TIMEOUT
 */
const session = new IdleSessionTimeout(1000 * 60 * 30);

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
};

const start = currentUserExp => {
  session.onTimeOut = () => {
    const exp =
      currentUserExp -
      parseInt(
        Date.now()
          .toString(10)
          .substring(0, 10)
      );

    if (exp <= 0) {
      void Router.replace('/');
    }
    setTimeout(() => {
      stop();
    }, 1500);
  };

  session.onTimeLeftChange = () => {
    //
  };
  session.start();
};

export default {
  onTimeOut: session.onTimeOut,
  sessionRestart: session.start,
  isMultipleof30,
  start,
  onTimeOutChange,
  timeOutAt,
  stop
};
