<template>
  <q-page
    class="fullscreen row items-center  justify-center"
    style="background: #505050"
  >
    <q-card square class="my-card" style=" height: 525px; width: 900px">
      <q-card-section class=" q-pa-none row">
        <div class=" col-4">
          <q-img
            src="~assets/home1.jpg"
            style="max-width: 100%; height: 100%; position: relative;"
          >
            <div
              class=" full-width full-height text-center"
              style="background: #ff980054"
            ></div>
          </q-img>
        </div>
        <div class=" column col-8">
          <div
            style="height: 50px; width: 100%"
            class=" q-pa-none q-ma-none full-width"
          >
            <q-tabs
              v-model="tab"
              no-caps
              class="bg-orange text-white shadow-2"
              style=" box-shadow: none"
            >
              <q-tab name="login" label="S'identifier" style="width: 50%" />
              <q-tab name="register" label="Créer compte" style="width: 50%" />
            </q-tabs>
          </div>

          <div style="height: 475px">
            <Login v-if="tab === 'login'" />
            <Register v-else />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import './index.css';

@Component({
  name: 'Index',
  components: {
    Login: require('src/components/Login.vue').default,
    Register: require('src/components/Register.vue').default,
    fileUploader: require('src/components/FileUploder').default
  }
})
export default class Index extends Vue {
  private tab = 'login';

  mounted() {
    //
  }
}
</script>
