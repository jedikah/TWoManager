import { Notify } from 'quasar';
import { GraphQLError } from 'graphql/error/GraphQLError';

export const context = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem('token') || ''}`
  }
});

type MessageType = 'positive' | 'negative' | 'warning' | 'info';

export const notifyThis = (message: string, type: MessageType = 'warning') => {
  Notify.create({
    type,
    message,
    position: 'bottom-right',
    timeout: 6000,
    multiLine: true,
    progress: true,
    actions: [
      {
        label: 'Compris',
        color: 'white',
        handler: () => {
          /* ... */
        }
      }
    ]
  });
};

export const notifyThere = (
  errors: readonly GraphQLError[],
  type: MessageType = 'warning'
) => {
  let i = 0;
  errors.map(err => {
    const time = parseInt(i++ + '000', 10);
    setTimeout(() => {
      notifyThis(err.message, type);
    }, time);
  });
};
