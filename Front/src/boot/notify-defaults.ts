import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default boot((/* { app, router, Vue ... } */) => {
  // something to do
  Notify.setDefaults({
    position: 'top-right',
    timeout: 2500,
    textColor: 'white'
  });
});
