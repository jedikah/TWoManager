<template>
  <q-card
    class="my-card"
    style="height: 100%; background: white;  box-shadow: none"
  >
    <q-card-section style="height: 50px">
      <div class="text-h6 text-center" style="color: #f2c037">
        Créer un compte
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md">
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md col">
          <div class="column">
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
                outlined
                bottom-slots
                v-model="pdpSrc"
                label-color="orange"
                label="Cliquer pour choisir une photo de profil"
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
              </q-file>
            </div>

            <!--
              SECTION FORMULAIRE
            -->
            <div class="row col-8">
              <q-input
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
            </div>
          </div>

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
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const user = namespace('user');

@Component
export default class Register extends Vue {
  private name = '';
  private login = '';
  private password = '';
  private pwdVisible = false;
  private pdpPath = '';

  @user.Action
  private initUsers: () => void;

  mounted() {
    this.initUsers();
  }

  reset() {
    this.name = '';
    this.login = '';
    this.password = '';
  }
  saveCountInfo() {
    //
  }
  handleSubmit() {
    this.saveCountInfo();
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
