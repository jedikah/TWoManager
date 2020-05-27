<template>
  <q-card flat bordered class="my-card">
    <q-card-section style="height: 50px">
      <div class="text-h6 text-center">Authentification</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md">
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md col">
          <!--
              SECTION FORMULAIRE
            -->
          <div class=" col-8" style="padding-top: 15px">
            <q-input
              :dense="true"
              filled
              v-model="login"
              label="Votre login *"
              hint="Indentifiant de connexion"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Le champ est obligatoir'
              ]"
            />

            <q-input
              :dense="true"
              filled
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
                  class="cursor-pointer"
                  @click="pwdVisible = !pwdVisible"
                />
              </template>
            </q-input>
          </div>

          <div class="row justify-center" style="">
            <q-btn label="Valider" type="submit" color="primary" />
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
  private pwdVisible = false;
  private pdpPath = '';
  private pdpSrc: { path: string } | null = null;
  private b64 = null;

  @Watch('pdpSrc')
  nameChanged(pdpSrc: { path: string }) {
    this.pdpPath = pdpSrc.path;

    this.b64 = base64.encodeFile(pdpSrc.path);
    console.log(this.pdpPath);
  }
  mounted() {
    const register = store.get('register');

    if (register) {
      this.name = register.name;
      this.login = register.login;
      this.password = register.password;
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
    if (this.b64) store.set('pdp', this.pdpPath);
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
