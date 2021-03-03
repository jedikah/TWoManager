<template>
  <div style="box-shadow: 0px 0px 6px 0.2px grey">
    <q-item-label header class="label">
      <q-space />
      <div>Liste de dossier</div>
      <q-space />
      <q-btn
        dense
        round
        color="amber"
        glossy
        text-color="black"
        icon="add"
        @click="handleOpenAddFolderForm"
      />
    </q-item-label>
    <q-separator />
    <q-list style="width: 100%; height: 94%; overflow: hidden">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="padding-right: 15px; height: 94%; min-height: 500px"
      >
        <div v-for="folder in folders" :key="folder.folderId">
          <q-expansion-item
            dense
            dense-toggle
            group="somegroup"
            expand-icon
            class="expansion"
          >
            <template v-slot:header>
              <q-item-section avatar center>
                <q-avatar icon="folder" color="amber" text-color="white" />
              </q-item-section>

              <q-item-section style="color: grey">
                <q-item-label lines="1" style="font-weight: 500">{{
                  folder.client.clientName
                }}</q-item-label>
                <q-item-label lines="2">{{ folder.typeTrav }}</q-item-label>
                <q-item-label caption class="q-mb-sm">{{
                  formatDate(folder.dateTrav)
                }}</q-item-label>
                <q-linear-progress size="xl" :value="progress1" color="orange">
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      style="opacity: 0.8"
                      color="white"
                      text-color="orange"
                      :label="progressLabel1"
                    />
                  </div>
                </q-linear-progress>
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                <q-btn-group style="margin-top: 5px; width: 100%">
                  <q-btn dense style="width: 50%" color="amber">PV</q-btn>
                  <q-btn dense style="width: 50%" color="orange"
                    >Supprimer</q-btn
                  >
                </q-btn-group>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-separator />
        </div>
      </q-scroll-area>
      <q-separator />
      <div class="row full-width justify-center items-center">
        <q-pagination
          dense
          v-model="state.pagination.page"
          :max="state.pagination.totalPages"
          :direction-links="true"
          :boundary-links="true"
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
          @input="(e) => fetchMoreFolder(e)"
        >
        </q-pagination>
      </div>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { scrollAreaStyle } from '../../utils/scrollAreaStyle';
import { useUserFolders } from '../../services/folders/useUserFolders';
import { dateParse } from 'src/utils/dateParse';
import { formsDrawer } from 'src/layouts/MainLayout.vue';
import { folderFormBtn } from './FolderForm.vue';

export default defineComponent({
  name: 'ListFolder',
  setup: () => {
    const { folders, loading, state, fetchMoreFolder } = useUserFolders();

    function formatDate(strDate: string) {
      const date = new Date(strDate);

      const str = dateParse({
        year: date.getFullYear(),
        month: date.getMonth(),
        days: date.getDate(),
      });

      return (
        str.dayWeek + ' ' + str.dayMonthNb + ' ' + str.month + ' ' + str.yearNb
      );
    }

    function handleOpenAddFolderForm() {
      formsDrawer.value = true;
      folderFormBtn.value = 'addFolder';
    }

    return {
      state,
      progress1: 0.3,
      progressLabel1: '100%',
      folders,
      formatDate,
      loading,
      ...scrollAreaStyle,
      fetchMoreFolder,
      handleOpenAddFolderForm,
    };
  },
});
</script>

<style scoped>
.label {
  font-weight: 900;
  font-size: 1.2em;
  position: relative;
  text-align: center;
  height: 6%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
