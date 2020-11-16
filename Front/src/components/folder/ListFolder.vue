<template>
  <div class="q-pa-md q-gutter-md">
    <q-list
      bordered
      padding
      class="rounded-borders list scroll"
      style="max-width: 500px; max-height: 75vh;"
    >
      <q-item-label header>Liste de dossier</q-item-label>

      <q-item v-for="i in new Array(200)" :key="i" clickable v-ripple>
        <q-item-section avatar center>
          <q-avatar icon="folder" color="amber" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Photos</q-item-label>
          <q-item-label caption class="q-mb-sm"
            >February 22nd, 2019</q-item-label
          >
          <q-linear-progress size="xl" :value="progress1" color="accent">
            <div class="absolute-full flex flex-center">
              <q-badge
                color="white"
                text-color="accent"
                :label="progressLabel1"
              />
            </div>
          </q-linear-progress>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListFolder',
  setup() {
    return {
      progress1: 0.3,
      progressLabel1: '100%'
    };
  }
};
</script>

<style></style>
