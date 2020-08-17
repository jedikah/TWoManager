<template>
  <q-card :class="'my-card '" :style="'background: none; margin-bottom: 5px;'">
    <div
      class=" full-width full-height"
      style="position: absolute;  background: white; opacity: 0.1 "
    ></div>

    <q-separator inset />

    <q-card-section class="column" style="padding: 0; margin: 0">
      <Avatar :src="photo" :name="userName" />
      <q-btn
        label="S'authentifier"
        type="button"
        color="amber"
        text-color="black"
        @click="
          checkTokenVariable.input = getToken();
          toCheckTokenMutate();
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
            toCheckTokenMutate();
            submitLogInSession();
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
              label="Mot de passe *"
              v-model="logInSessionState.password"
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
                @click="logInSessionState.password = ''"
              />
            </q-btn-group>
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watchEffect
} from '@vue/composition-api';
import { useState } from '@u3u/vue-hooks';

import { useCheckToken } from 'src/services/users/useCheckToken';
import { useLogInSession } from 'src/services/users/useLogInSession';

export default defineComponent({
  components: {
    Avatar: require('../templates/Avatar.vue').default
  },
  setup: (_, { root }) => {
    const toLogin = ref(false);
    const pwdVisible = ref(false);
    const state = reactive({
      currentUser: root.$store.state.sessionModule.currentUser
    });

    const [logInSessionState, submitLogInSession] = useLogInSession();

    const [
      onCheckTokenDone,
      checkTokenVariable,
      toCheckTokenMutate
    ] = useCheckToken();

    onCheckTokenDone(() => {
      toLogin.value = true;
    });

    const getToken = () => {
      return localStorage.getItem('token') || '';
    };

    logInSessionState.login = state.currentUser.login;

    return {
      toLogin,
      pwdVisible,
      ...state.currentUser,
      checkTokenVariable,
      toCheckTokenMutate,
      submitLogInSession,
      logInSessionState,
      getToken
    };
  }
});
</script>

<style></style>
