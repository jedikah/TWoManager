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
                label-color="orange"
                label="Cliquer pour choisir une photo de profil"
                counter
                accept=".jpg"
              >
              </q-file>
            </div>

            <!--
              SECTION FORMULAIRE
            -->
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
                class="col-6"
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
                class="col-6"
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
              <input type="file" name="image" @change="onChange" />
            </div>
          </div>
          <q-btn download="abcd.zip" :href="b64">download</q-btn>
          <div class=" full-width" style="">
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
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { RegisterInput } from '../store/loginPage/types';
// import { fileToB64 } from '../module/base64';

const user = namespace('user');
// const base64 = require('base64-min');

@Component({ name: 'Register' })
export default class Register extends Vue {
  private name = '';
  private login = '';
  private password = '';
  private pwdVisible = false;
  private b64: string | ArrayBuffer = '';
  private pdpSrc = null;
  @Prop({ default: { form: '', h1: '', dark: false } })
  readonly myclass?: string;

  @Watch('pdpSrc')
  changePdp(src) {
    // this.b64 = await fileToB64(src);
    this.b64 = URL.createObjectURL(src);
    console.log(src);
  }

  @user.Action
  private register: (input: RegisterInput) => void;

  reset() {
    this.name = '';
    this.login = '';
    this.password = '';
  }

  handleSubmit() {
    const { notify } = this.$q;
    this.register({
      userName: this.name,
      login: this.login,
      password: this.password,
      pdpPath: this.pdpSrc,
      notify
    });
    this.$emit('onSubmit');
  }

  onChange({
    target: {
      validity,
      files: [file]
    }
  }) {
    const { notify } = this.$q;
    this.register({
      userName: this.name,
      login: this.login,
      password: this.password,
      pdpPath: file,
      notify
    });
    console.log({ validity, file });
  }
}
</script>

<style></style>
