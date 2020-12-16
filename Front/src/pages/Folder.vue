<template>
  <q-page>
    <div class="q-pa-md row justify-center" style="  height: 100%">
      <ListFolder />
      <ModelView />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Folder',
  components: {
    ListFolder: require('../components/folder/ListFolder').default,
    ModelView: require('../components/folder/modeView').default
  }
});
</script>
