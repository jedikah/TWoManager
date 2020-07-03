<template>
  <q-card
    class="my-card"
    style="height: 100%; background: white; box-shadow: none"
  >
    <q-card-section style="height: 50px">
      <div class="text-h6 text-center" style="color: #f2c037">S'identifier</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md">
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md col">
          <!--
              SECTION FORMULAIRE
            -->
          <div class=" col-8" style="padding-top: 15px; margin-">
            <q-input
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
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { LoginInput } from 'src/store/user/types';

import { User } from 'src/models/types';
import userQuery from 'src/models/query/user';
import { Session } from 'src/store/user/types';
import userSession from 'src/module/session.module';

const user = namespace('user');

@Component({ name: 'Login' })
export default class Login extends Vue {
  private login = '';
  private password = '';
  private pwdVisible = false;
  private t: string;

  @user.State
  public loadingUser: boolean;

  @user.State
  public session: Session;

  @user.Getter
  public users: User[];

  @user.Action
  public initUsers: () => void;

  @user.Action
  public loginAct: (loginInput: LoginInput) => Promise<void>;

  mounted() {
    this.initUsers();

    console.log({ loadingUser: this.loadingUser, session: this.session });
  }

  reset() {
    this.login = '';
    this.password = '';
  }

  async handleSubmit() {
    const { IdUser, name, login, password } = await userQuery.login(
      this.login,
      this.password
    );

    userSession.generateTokenToStore({ IdUser, name, login, password });
    const isStarted = userSession.start(
      tokenIsExpired => {},
      time => {
        const t = Math.round(time / 1000);
        if (userSession.isMultipleof30(t)) console.log(t);
      }
    );

    if (isStarted) {
      this.triggerPositive();
      this.$router.push('/main');
    } else this.triggerNegative();
    this.$emit('onSubmit');
  }

  triggerPositive() {
    this.$q.notify({
      type: 'positive',
      message: 'Login et mot de passe correct!'
    });
  }

  triggerNegative() {
    this.$q.notify({
      type: 'negative',
      message: 'Login ou mot de passe incorrect!'
    });
  }
}
</script>

<style></style>
