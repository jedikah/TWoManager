<template>
  <q-card
    :class="'my-card ' + myclass.form"
    style="height: 100%; background: none"
  >
    <div
      class=" full-width full-height"
      style="position: absolute;  background: white; opacity: 0.1 "
    ></div>
    <q-card-section :class="myclass.h1" style="height: 50px;">
      <div class="text-h6 text-center" style="color: #f2c037">
        S'identifier
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="q-pa-md">
        <q-form
          @submit.prevent="loginSessionSubmit(password)"
          class="q-gutter-md col "
        >
          <!--
              SECTION FORMULAIRE
            -->
          <Avatar
            :src="currentUserState.photo"
            :name="currentUserState.userName"
          />
          <div class=" col-8 q-gutter-lg " style="padding-top: 15px; ">
            <q-input
              :dark="myclass.dark"
              :dense="true"
              outlined
              color="grey-3"
              label-color="orange"
              lazy-rules
              label="Mot de passe *"
              v-model="passwordState"
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
                @click="password = ''"
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
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';

@Component({
  name: 'Login',
  computed: {
    ...mapFields({
      passwordState: 'usersModule.loginState.form.password',
      currentUserState: 'usersModule.currentUser'
    })
  },
  methods: {
    ...mapActions('usersModule', { loginSubmit: 'loginSubmit' })
  },
  components: {
    Avatar: require('../templates/Avatar.vue').default
  }
})
export default class Login extends Vue {
  //Props
  @Prop({
    required: false,
    type: Object,
    default: () => ({ form: '', h1: '', dark: false })
  })
  readonly myclass: { from: string; h1: string; dark: boolean };

  private pwdVisible = false;

  mounted() {
    // console.log({ myclass: this.myclass });
  }
}
</script>

<style></style>
