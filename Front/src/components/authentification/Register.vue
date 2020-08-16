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
        <q-form @submit.prevent="submitRegister()" class=" col">
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
                  <q-img v-if="b64 !== ''" :src="b64" />
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
                v-model="pdpUploadVar.file"
                max-file-size="2000048"
                label-color="orange"
                label="Poids max (2M)"
                counter
                accept=".jpg"
                @rejected="
                  $q.notify({
                    type: 'negative',
                    message: 'Votre photo de profile ne doit pas dépasser 2Mo'
                  })
                "
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
                v-model="registerState.userName"
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
                v-model="registerState.login"
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
                  v-model="registerState.password"
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
                    val =>
                      val === registerState.password ||
                      'Le champ est obligatoir'
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
                class=" col-12"
                style=" box-shadow: none; "
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
                  @click="
                    registerState.userName = '';
                    registerState.login = '';
                    registerState.password = '';
                    passwordConfirm = '';
                  "
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
import { ref, defineComponent, Ref, watch } from '@vue/composition-api';

import { useRegister } from 'src/services/users/useRegister';

export default defineComponent({
  props: {
    myclass: {
      required: false,
      type: Object,
      default: () => ({ form: '', h1: '', dark: false })
    }
  },
  setup: () => {
    const [
      registerState,
      loadingRegister,
      submitRegister,
      pdpUploadVar
    ] = useRegister();

    const b64: Ref<string | ArrayBuffer> = ref('');
    const pwdVisible = ref(false);
    const passwordConfirm = ref('');
    const pdpFile: Ref<string> = ref(null);

    watch(pdpUploadVar, newPdpFile => {
      b64.value = URL.createObjectURL(newPdpFile.file);

      if (pdpUploadVar.file) {
        pdpUploadVar.login = registerState.login;
        registerState.photo =
          registerState.login + '/' + registerState.login + '_pdp.JPG';
      }
    });

    return {
      registerState,
      loadingRegister,
      submitRegister,
      b64,
      pwdVisible,
      passwordConfirm,
      pdpUploadVar
    };
  }
});
</script>

<style></style>
