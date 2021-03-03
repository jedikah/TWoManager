<template>
  <q-page>
    <div class="q-pa-md row justify-center" style="height: 100%">
      <ListFolder style="width: 25%; height: 95%; z-index: 10" />
      <ModelView style="width: 74%" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Folder',
  mixins: [require('vue-html-to-paper')],
  components: {
    ListFolder: require('../components/folder/ListFolder.vue').default,
    ModelView: require('../components/folder/ModeView.vue').default,
  },
});
</script>
