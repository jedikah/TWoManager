<template>
  <q-layout view="lHr lpR lFr" class="row">
    <q-drawer
      v-model="left"
      side="left"
      behavior="desktop"
      @click="slide()"
      :width="width"
    >
      <div class=" row justify-center items-center full-height full-width">
        <q-img src="~assets/home4.jpg" style="width: 100%; height: 100%;">
          <div
            class=" full-width full-height text-center"
            style="background: #c3870075; width: 100%; height: 100%;"
          ></div>
        </q-img>
        <h4
          :style="
            'position: absolute; font-weight: bold; color: white; font-size: ' +
              size +
              '%'
          "
        >
          S'enregistrer
        </h4>
      </div>
    </q-drawer>

    <q-drawer
      v-model="right"
      side="right"
      behavior="desktop"
      @click="slide()"
      :width="width"
    >
      <div
        class=" row justify-center items-center full-height full-width boredr"
      >
        <q-img dark src="~assets/home1.jpg" style="width: 100%; height: 100%">
          <div
            class=" full-width full-height text-center"
            style="background: #ff980054; width: 100%; height: 100%;"
          ></div>
        </q-img>

        <h4 style="position: absolute; font-weight: bold; color: white">
          Se connecter
        </h4>
      </div>
    </q-drawer>

    <q-page-container
      class="col-12 row justify-center items-center"
      style="background: #333"
    >
      <Login
        v-if="left"
        :myclass="{
          form: 'form-black',
          h1: 'h1-black',
          dark: true
        }"
        style="width: 500px;
      height: 600px"
      />
      <Register
        v-else
        :myclass="{
          form: 'form-black',
          h1: 'h1-black',
          dark: true
        }"
        style="width: 500px; height: 600px"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'index',
  components: {
    Login: require('src/components/Login.vue').default,
    Register: require('src/components/Register.vue').default
  }
})
export default class Index extends Vue {
  private left = true;
  private right = false;
  private width = 0;
  private size = 0;

  created() {
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize();
  }

  handleResize() {
    this.width = (35 * window.innerWidth) / 100;
    this.size = (25 * window.innerWidth) / 100;
  }

  slide() {
    this.left = !this.left;
    this.right = !this.right;
  }
}
</script>
