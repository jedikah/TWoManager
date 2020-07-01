<template>
  <q-page class="row items-center  justify-center">
    jkkbn ,ml,m,
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'WorkSpace',
  components: {
    Login: require('src/components/Login.vue').default,
    Register: require('src/components/Register.vue').default,
    fileUploader: require('src/components/FileUploder').default
  }
})
export default class WorkSpace extends Vue {}
</script>
