<template>
  <q-page>
    <div class="q-pa-md" style="min-height: 720px; max-height: 900px">
      <q-card flat style="height: calc(100vh - 75px)">
        <q-card-section class="flex row full-height q-gutter-md full-height">
          <ListFolder style="width: 20%" />
          <ModelView style="width: 75%" />
        </q-card-section>
      </q-card>
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
