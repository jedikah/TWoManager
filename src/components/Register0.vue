<template>
  <q-card flat bordered class="my-card">
    <q-card-section style="height: 50px, padding-top: 0px">
      <div class="text-h6 text-center">Creation de compte</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section style="padding: 0px">
      <div class="q-pa-md">
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md col">
          <div class="row">
            <!--
              SECTION PDP
            -->
            <div class=" column justify-center items-center col-4">
              <!--Avatar-->
              <q-avatar
                size="125px"
                style="background-color: #1976d217; margin-bottom: 15px"
              >
                <img
                  v-if="pdpPath !== ''"
                  :src="'data:image/png;base64,' + b64"
                />
                <q-icon
                  v-if="pdpPath === ''"
                  name="face"
                  class="cursor-pointer"
                />
              </q-avatar>
              <!--File chooser-->
              <q-file
                :dense="true"
                filled
                bottom-slots
                v-model="pdpSrc"
                label="Image"
                accept=".jpg, .png"
                counter
              >
                <template v-slot:before>
                  <q-avatar size="40px">
                    <img
                      v-if="pdpPath !== ''"
                      :src="'data:image/png;base64,' + b64"
                    />
                    <q-icon
                      style="font-size: 2em"
                      v-if="pdpPath === ''"
                      name="face"
                      class="cursor-pointer"
                    />
                  </q-avatar>
                </template>

                <template v-slot:hint>
                  Field hint
                </template>

                <template v-slot:after>
                  <q-btn round dense flat icon="send" />
                </template>
              </q-file>
            </div>

            <!--
              SECTION FORMULAIRE
            -->
            <div class=" col-8 border-black" style="">
              <q-input
                :dense="true"
                filled
                v-model="name"
                label="Votre nom *"
                hint="Nom complet"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Le champ est obligatoir'
                ]"
              />

              <q-input
                :dense="true"
                filled
                v-model="login"
                label="Votre login *"
                hint="Indentifiant d'authentification"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Le champ est obligatoir'
                ]"
              />

              <div class="row">
                <q-input
                  style="margin-right: 5px;"
                  :dense="true"
                  filled
                  lazy-rules
                  label="Mot de passe *"
                  v-model="password"
                  :type="!pwdVisible ? 'password' : 'text'"
                  :rules="[
                    val => (val && val.length > 0) || 'Le champ est obligatoir'
                  ]"
                  hint="Mot de passe d'authentification"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="!pwdVisible ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="pwdVisible = !pwdVisible"
                    />
                  </template>
                </q-input>

                <q-input
                  :dense="true"
                  filled
                  lazy-rules
                  label="Resaisir mot de passe *"
                  v-model="passwordRetype"
                  :type="!pwdVisible ? 'password' : 'text'"
                  :rules="[
                    val =>
                      (val && val.length > 0 && val === password) ||
                      (val &&
                        val.length > 0 &&
                        val !== password &&
                        'le mot de passe ne correspond pas') ||
                      'Le champ est obligatoir'
                  ]"
                  hint="Resisir le mot de passe"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="!pwdVisible ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="pwdVisible = !pwdVisible"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="row justify-end" style="">
            <q-btn label="Enregistrer" type="submit" color="primary" />
            <q-btn
              flat
              @click="reset"
              label="Reset"
              type="reset"
              color="primary"
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as base64 from 'base64-min';
const Store = require('electron-store');
const store = new Store();

@Component
export default class Register extends Vue {
  private name = '';
  private login = '';
  private password = '';
  private passwordRetype = '';
  private pwdVisible = false;
  private pdpPath = '';
  private pdpSrc = null;
  private b64 = null;

  @Watch('pdpSrc')
  nameChanged(pdpSrc: { path: string }) {
    this.pdpPath = pdpSrc.path;

    this.b64 = base64.encodeFile(pdpSrc.path);
    console.log(this.pdpPath);
  }
  mounted() {
    const register = store.get('register');
    const pdpPath = store.get('pdp');
    console.log(pdpPath);
    if (register) {
      this.name = register.name;
      this.login = register.login;
      this.password = register.password;
    }
    if (pdpPath) {
      this.pdpPath = pdpPath;
      this.b64 = base64.encodeFile(pdpPath);
    }

    console.log(this.pdpSrc);
  }

  reset() {
    this.name = '';
    this.login = '';
    this.password = '';
  }

  saveAdminInfo() {
    store.set('register', {
      name: this.name,
      login: this.login,
      password: this.password
    });

    if (this.pdpPath) store.set('pdp', this.pdpPath);
  }

  handleSubmit() {
    this.saveAdminInfo();
    this.triggerPositive();
    this.$emit('onSubmit');
  }

  triggerPositive() {
    this.$q.notify({
      type: 'positive',
      message: 'Enregistrement reussi, vous pouvez terminer'
    });
  }
}
</script>

<style></style>
