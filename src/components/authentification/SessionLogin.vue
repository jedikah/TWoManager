<template>
  <q-card :class="'my-card '" :style="'background: none; margin-bottom: 5px;'">
    <div
      class=" full-width full-height"
      style="position: absolute;  background: white; opacity: 0.1 "
    ></div>

    <q-separator inset />

    <q-card-section class="column" style="padding: 0; margin: 0">
      <Avatar :src="currentUserState.photo" :name="currentUserState.userName" />
      <q-btn
        label="S'authentifier"
        type="button"
        color="amber"
        text-color="black"
        @click="
          checkTokenSession();
          toLogin = !toLogin;
        "
      />
    </q-card-section>

    <q-card-section
      v-if="toLogin"
      style="padding-top: 0; margin-top: 0; background: white"
    >
      <div class=" q-gutter-xs">
        <q-form
          @submit.prevent="
            loginSessionSubmit({
              loginState: currentUserState.login,
              passwordState
            })
          "
          class="q-gutter-sx"
        >
          <!--
              SECTION FORMULAIRE
            -->

          <div class=" col-8 q-gutter-xs " style="padding-top: 15px; ">
            <q-input
              :dense="true"
              outlined
              color="grey-3"
              label-color="orange"
              lazy-rules
              label="Mot de passe *"
              v-model="passwordState"
              :type="!pwdVisible ? 'password' : 'text'"
              :rules="[
                val => (val && val.length > 0) || 'Le champ est obligatoir'
              ]"
              hint="Mot de passe de connexion"
            >
              <template v-slot:append>
                <q-icon
                  :name="!pwdVisible ? 'visibility_off' : 'visibility'"
                  color="orange"
                  class="cursor-pointer"
                  @click="pwdVisible = !pwdVisible"
                />
              </template>
            </q-input>

            <q-btn-group class=" col-12" style=" box-shadow: none" spread push>
              <q-btn
                label="Valider"
                type="submit"
                color="amber"
                text-color="black"
              />
              <q-btn
                label="Reset"
                color="orange"
                text-color="black"
                @click="passwordState = ''"
              />
            </q-btn-group>
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';

import userSession from 'src/module/session.module.ts';

@Component({
  name: 'Login',
  computed: {
    ...mapFields({
      passwordState: 'usersModule.loginState.form.password',
      currentUserState: 'usersModule.currentUser'
    })
  },
  methods: {
    ...mapActions('usersModule', ['loginSessionSubmit', 'checkTokenSession'])
  },
  components: {
    Avatar: require('../templates/Avatar.vue').default
  }
})
export default class Login extends Vue {
  private toLogin = false;

  private pwdVisible = false;

  mounted() {
    // console.log({ myclass: this.myclass });
  }
}
</script>

<style></style>
