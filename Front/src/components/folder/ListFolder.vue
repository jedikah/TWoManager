<template>
  <form-card
    title="Liste de dossier"
    :add="true"
    :padding="false"
    @onAddClick="() => {}"
  >
    <template v-slot:addBtn>
      <folder-form-add />
    </template>

    <q-list style="width: 100%; height: 100%; overflow: hidden">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 94%; min-height: 500px"
      >
        <span v-if="loading">
          <div v-for="skeleton in [0, 1, 2, 3, 5, 6, 7, 8, 9]" :key="skeleton">
            <q-item>
              <q-item-section avatar>
                <q-skeleton
                  style="width: 40px; height: 40px; border-radius: 40px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">
                  <q-skeleton style="width: 50%; height: 15px" />
                </q-item-label>
                <q-item-label lines="2">
                  <q-skeleton style="width: 70%; height: 30px" />
                </q-item-label>
                <!-- <q-item-label caption>
                  <q-skeleton style="width: 90%; height: 15px" />
                </q-item-label> -->
              </q-item-section>
            </q-item>
            <q-separator />
          </div>
        </span>
        <span v-if="!loading">
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
                    folder.client.name
                  }}</q-item-label>
                  <q-item-label
                    lines="2"
                    :class="!folder.typeTrav && 'text-red'"
                    >{{
                      folder.typeTrav
                        ? folder.typeTrav.label
                        : 'Aucun type de travaux'
                    }}</q-item-label
                  >
                  <q-item-label caption class="q-mb-sm">{{
                    formatDate(folder.dateTrav)
                  }}</q-item-label>
                  <!-- <q-linear-progress
                    size="xl"
                    :value="progress1"
                    color="orange"
                  >
                    <div class="absolute-full flex flex-center">
                      <q-badge
                        style="opacity: 0.8"
                        color="white"
                        text-color="orange"
                        :label="progressLabel1"
                      />
                    </div>
                  </q-linear-progress> -->
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
        </span>
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
  </form-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { scrollAreaStyle } from '../../utils/scrollAreaStyle';
import { useUserFolders } from '../../services/folders/useUserFolders';
import { dateParse } from 'src/utils/dateParse';

export default defineComponent({
  name: 'ListFolder',
  components: {
    formCard: require('../public/FormCard.vue').default,
    FolderFormAdd: require('./FolderForm.add.vue').default,
  },
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

    return {
      state,
      progress1: 0.3,
      progressLabel1: '100%',
      folders,
      formatDate,
      loading,
      ...scrollAreaStyle,
      fetchMoreFolder,
    };
  },
});
</script>

<style scoped>
.label {
  font-weight: 900;
  position: relative;
  text-align: center;
  height: 6%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
