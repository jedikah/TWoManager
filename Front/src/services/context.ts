import { useQuasar, Notify, QVueGlobals } from 'quasar';
import { GraphQLError } from 'graphql/error/GraphQLError';


export const context = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem('token') || ''}`
  }
});

type MessageType = 'positive' | 'negative' | 'warning' | 'info';
type Position = 'bottom-right' | 'top-left' | 'top-right' | 'bottom-left' | 'top' | 'bottom' | 'left' | 'right' | 'center'
interface ThisNotify {
  message: string,
  type: MessageType,
  position?: Position,
  timeout?: number,
  progress?: boolean
}

export const notifyThis = ({message, type, position = 'bottom-right', timeout = 6000, progress = true }: ThisNotify) => {

  Notify.create({
    type,
    message,
    position,
    timeout,
    multiLine: true,
    progress,
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
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const time = parseInt(i++ + '000', 10);
    setTimeout(() => {
      notifyThis({message: err.message, type});
    }, time);
  });
};
