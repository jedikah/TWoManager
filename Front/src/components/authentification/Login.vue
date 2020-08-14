<template>
  <q-card :class="'my-card ' + myclass.form" style="height: 100%">
    <q-card-section :class="myclass.h1" style="height: 50px;">
      <div class="text-h6 text-center" style="color: #f2c037">S'identifier</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md">
        <q-form @submit.prevent="loginSubmit()" class="q-gutter-md col ">
          <!--
              SECTION FORMULAIRE
            -->
          <div class=" col-8 q-gutter-lg " style="padding-top: 15px; ">
            <q-input
              :dark="myclass.dark"
              :dense="true"
              outlined
              color="grey-3"
              label-color="orange"
              v-model="logIn.login"
              label="Votre login *"
              hint="Indentifiant de connexion"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Le champ est obligatoir'
              ]"
            >
              <template v-slot:append>
                <q-icon name="account_circle" color="orange" />
              </template>
            </q-input>
            <q-input
              :dark="myclass.dark"
              :dense="true"
              outlined
              color="grey-3"
              label-color="orange"
              lazy-rules
              label="Mot de passe *"
              v-model="logIn.password"
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
                @click="
                  logIn.login = '';
                  logIn.password = '';
                "
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
  ref,
  computed,
  watch,
  toRef,
  reactive,
  defineComponent,
  createApp
} from '@vue/composition-api';

import { logIn } from 'src/services/store/state';
import { useLogIn } from 'src/services/users/useLogIn';

export default defineComponent({
  props: {
    myclass: {
      required: false,
      type: Object,
      default: () => ({ form: '', h1: '', dark: false })
    }
  },
  setup: () => {
    const pwdVisible = ref(false);
    return {
      logIn,
      pwdVisible
    };
  }
});
</script>

<style></style>
