<template>
  <q-card
    flat
    bordered
    class="my-card row justify-center items-center"
    style="width: 500px"
  >
    <div class=" full-width">
      <q-file
        :dense="true"
        filled
        bottom-slots
        v-model="fileSrc"
        label="Image"
        counter
      >
        <template v-slot:hint>
          Field hint
        </template>
      </q-file>
    </div>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { user } from '../module/db.module';

@Component
export default class Register extends Vue {
  private filePath = '';
  private fileSrc = null;
  private b64 = null;

  @Watch('fileSrc')
  nameChanged(fileSrc: { path: string }) {
    this.fileToB64(fileSrc.path).then();
  }
  mounted() {
    console.log('test: ', this.filePath);
  }

  async fileToB64(path: string) {
    this.filePath = path;

    this.b64 = await user.fileUploader(path);
    console.log('test: ', this.b64);
  }
}
</script>
