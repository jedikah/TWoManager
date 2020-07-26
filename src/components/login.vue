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
              v-model="userLogin"
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
// import { LoginInput } from 'src/store/user/types';

// import userSession from 'src/module/session.module';

const user = namespace('user');

@Component({ name: 'Login' })
export default class Login extends Vue {
  private userLogin = '';
  private password = '';
  private pwdVisible = false;
  @Prop({ default: { form: '', h1: '', dark: false } })
  readonly myclass?: string;

  @user.Action
  private setSession: (session: string) => void;

  @user.Action
  private login: (input: {
    login: string;
    password: string;
    notify: Function;
  }) => void;

  mounted() {
    // console.log(
    //   this.$router.push({ name: 'main', params: { userId: '2' } })
    // );
  }

  reset() {
    this.userLogin = '';
    this.password = '';
  }

  handleSubmit() {
    const { notify } = this.$q;

    this.login({
      login: this.userLogin,
      password: this.password,
      notify
    });
  }
}
</script>

<style></style>
