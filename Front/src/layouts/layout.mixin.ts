import { Vue } from 'vue-property-decorator';
import { Accessors } from 'types';
import { mapFields } from 'vuex-map-fields';
import { mapMutations } from 'vuex';

import { CurrentUser, formsRouteType } from 'src/store/users/users.types';

type MainLayoutType = Accessors<{
  session: boolean;
  currentUser: CurrentUser;
  formsRoute: formsRouteType;
  formsDrawer: boolean;
}>;

export const MainLayoutProperty = Vue.extend({
  computed: {
    ...(mapFields({
      session: 'usersModule.session',
      currentUser: 'usersModule.currentUser',
      formsRoute: 'usersModule.formsRoute',
      formsDrawer: 'usersModule.formsDrawer'
    }) as MainLayoutType)
  },
  methods: {
    ...mapMutations('usersModule', { setFormsDrawer: 'setFormsDrawer' })
  }
});
