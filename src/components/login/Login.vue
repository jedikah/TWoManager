<template>
  <q-card :class="'my-card ' + myclass.form" style="height: 100%">
    <q-card-section :class="myclass.h1" style="height: 50px;">
      <div class="text-h6 text-center" style="color: #f2c037">S'identifier</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md">
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md col ">
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
              v-model="login"
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
              v-model="password"
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
          </div>

          <div class="row justify-center" style="">
            <q-btn-group
              class=" full-width"
              style=" box-shadow: none"
              spread
              push
            >
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
                @click="reset()"
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
import { namespace } from 'vuex-class';

import { loginState } from './login.state';

const loginPage = namespace('loginPage');

@Component({ name: 'Login' })
export default class Login extends Vue {
  //Props
  @Prop({ default: { form: '', h1: '', dark: false } })
  readonly myclass?: string;

  private pwdVisible = false;

  //state
  @loginPage.State
  private loginState: typeof loginState;

  // action
  @loginPage.Action
  private setLogin: (login: string) => void;

  @loginPage.Action
  private setPassword: (password: string) => void;

  @loginPage.Action
  private loginSubmit: (input: typeof loginState.form) => void;
  //getter and setter
  get login() {
    return this.loginState.form.login;
  }

  set login(value) {
    this.setLogin(value);
  }

  get password() {
    return this.loginState.form.password;
  }

  set password(value) {
    this.setPassword(value);
  }

  mounted() {
    // console.log({ state: this.loginState.form.login });
  }

  reset() {
    this.setPassword('');
    this.setLogin('');
  }

  handleSubmit() {
    const { notify } = this.$q;

    this.loginSubmit({
      login: this.login,
      password: this.password,
      notify
    });
  }
}
</script>

<style></style>
