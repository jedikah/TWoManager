<template>
  <div class="row justify-center content-center">
    <q-card
      flat
      bordered
      class="my-card"
      style="min-width: 400px; min-height: 100px; z-index: 1"
    >
      <q-card-section>
        <div class="text-h6 text-center">Choisir l'emplacement des donnees</div>
      </q-card-section>

      <q-separator inset />
      <br />
      <q-card-section @click="openDirectory">
        <q-field
          standout="bg-teal text-white"
          label="Choix de l'emplacement des donnees"
          style="padding-left: 15px; padding-right: 15px;"
          stack-label
        >
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ dir ? dir : '' }}
            </div>
          </template>
          <template v-slot:append>
            <q-icon name="folder_opent" color="secondary" />
          </template>
        </q-field>
        <br />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const { dialog } = require('electron').remote;
const Store = require('electron-store');
const store = new Store();

@Component
export default class DBPathSelector extends Vue {
  private dir = store.get('path')
    ? store.get('path').replace(/\//g, '\\')
    : null;
  private isDisable = true;
  private openDialog = false;
  private dialogIsConfirmed = false;

  mounted() {
    // console.log(store.get('path').replace(/\//g, '\\'));
  }

  openDirectory() {
    const path =
      dialog.showOpenDialogSync({ properties: ['openDirectory'] }) || [];
    this.dir = path[0] || null;
    if (this.dir) store.set('path', this.dir.replace(/\\/g, '/'));
  }

  onSubmit() {
    if (this.dir) {
      this.openDialog = true;
    }
  }
  onReset() {
    this.dir = '';
  }
  saveDir() {
    store.set('path', this.dir.replace(/\\/g, '/'));
    this.isDisable = true;
    // const window = remote.getCurrentWindow();
    // window.close();
  }
}
</script>

<style></style>
