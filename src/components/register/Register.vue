<template>
  <q-card :class="'my-card ' + myclass.form" style="height: 100%;">
    <q-card-section :class="myclass.h1" style="height: 50px">
      <div class="text-h6 text-center" style="color: #f2c037">
        Créer un compte
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md">
        <q-form @submit.prevent="handleSubmit" class=" col">
          <div class="column full-width">
            <!--
              SECTION PDP
            -->
            <div
              class=" row full-width justify-center items-center col-4"
              style="margin: 0;"
            >
              <!--Avatar-->
              <div class="col-4">
                <q-avatar
                  size="125px"
                  style="background-color: #1976d217; margin-bottom: 15px"
                >
                  <q-img v-if="b64 !== ''" :src="b64"></q-img>
                  <q-icon
                    v-if="b64 === ''"
                    name="face"
                    class="cursor-pointer"
                  />
                </q-avatar>
              </div>

              <!--File chooser-->

              <q-file
                class="col-8"
                :dark="myclass.dark"
                :dense="true"
                outlined
                bottom-slots
                v-model="pdpSrc"
                max-file-size="2000048"
                label-color="orange"
                label="Poids max (2M)"
                counter
                accept=".jpg"
                @rejected="onRejected"
              >
              </q-file>
            </div>

            <!-- SECTION FORMULAIRE -->

            <div class="row col-8 q-gutter-lg">
              <q-input
                :dark="myclass.dark"
                class="col-12"
                :dense="true"
                outlined
                label-color="orange"
                v-model="name"
                label="Votre nom *"
                hint="Nom complet"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Le champ est obligatoir'
                ]"
              />

              <q-input
                :dark="myclass.dark"
                class="col-12"
                :dense="true"
                outlined
                color="grey-3"
                label-color="orange"
                v-model="login"
                label="Votre login *"
                hint="Indentifiant de connexion"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Le champ est obligatoir.',
                  val => (val && val.length < 21) || '20 charactère au max.',
                  val =>
                    val.split(' ').length <= 1 ||
                    'Ce champ ne doit pas contenir des éspaces.'
                ]"
              >
                <template v-slot:append>
                  <q-icon name="account_circle" color="orange" />
                </template>
              </q-input>
              <!-- MOTS DE PASSE -->
              <div class="col-12 row ">
                <q-input
                  :dark="myclass.dark"
                  class="col-6 "
                  :dense="true"
                  outlined
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

                <q-input
                  :dark="myclass.dark"
                  class="col-6"
                  :dense="true"
                  outlined
                  label-color="orange"
                  lazy-rules
                  label="Mot de passe *"
                  v-model="passwordConfirm"
                  :type="!pwdVisible ? 'password' : 'text'"
                  :rules="[
                    val => val === password || 'Le champ est obligatoir'
                  ]"
                  hint="Confirmer le mot de passe"
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
              <!-- BOUTON SUBMIT  -->
              <q-btn-group
                class=" full-width"
                style=" box-shadow: none"
                spread
                push
              >
                <q-btn
                  color="amber"
                  text-color="black"
                  type="submit"
                  push
                  label="Enregistrer"
                />
                <q-btn
                  color="orange"
                  text-color="black"
                  type="reset"
                  @click="reset"
                  push
                  label="Reset"
                />
              </q-btn-group>
            </div>
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { RegisterForm } from './register.types';
// import { fileToB64 } from '../module/base64';

const user = namespace('loginPage');
// const base64 = require('base64-min');

@Component({ name: 'Register' })
export default class Register extends Vue {
  private name = '';
  private login = '';
  private password = '';
  private passwordConfirm = '';
  private pwdVisible = false;
  private b64: string | ArrayBuffer = '';
  private pdpSrc = null;
  @Prop({ default: { form: '', h1: '', dark: false } })
  readonly myclass?: string;

  @Watch('pdpSrc')
  changePdp(src) {
    this.b64 = URL.createObjectURL(src);
  }

  @user.Action
  private register: (input: RegisterForm) => void;

  reset() {
    this.name = '';
    this.login = '';
    this.password = '';
    this.passwordConfirm = '';
  }

  handleSubmit() {
    const { notify } = this.$q;
    this.register({
      userName: this.name,
      login: this.login,
      password: this.password,
      pdpFile: this.pdpSrc,
      notify
    });
    this.$emit('onSubmit');
  }

  onRejected() {
    // Notify plugin needs to be installed
    // https://quasar.dev/quasar-plugins/notify#Installation
    this.$q.notify({
      type: 'negative',
      message: 'Votre photo de profile ne doit pas dépasser 2Mo'
    });
  }
}
</script>

<style></style>
