<template>
  <div
    style=" box-shadow: 0px 0px 6px 0.2px grey; width: 25%; position: sticky; height: 95%; "
  >
    <q-item-label
      header
      style=" font-weight: 900; font-size: 1.2em; text-align: center; height: 6%"
      >Liste de dossier</q-item-label
    >
    <q-separator />
    <q-list style="width: 100%;  height: 94%; overflow: hidden">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="padding-left: 15px; padding-right: 15px; height: 94%; min-height: 500px; "
      >
        <div
          v-for="folder in !loading ? result.userFolders.folders : []"
          :key="folder.folderId"
        >
          <q-expansion-item dense dense-toggle group="somegroup" expand-icon>
            <template v-slot:header>
              <q-item-section avatar center>
                <q-avatar icon="folder" color="amber" text-color="white" />
              </q-item-section>

              <q-item-section style="color: grey">
                <q-item-label lines="1">{{
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
      <template style="height: 3%">
        <div class="row full-width justify-center">
          <q-pagination
            v-model="state.pagination.page"
            :max="state.pagination.totalPages"
            :direction-links="true"
            :boundary-links="true"
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
            @input="e => fetchMoreFolder(e)"
          >
          </q-pagination>
        </div>
      </template>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { date } from 'quasar';

import { scrollAreaStyle } from '../../module/scrollAreaStyle';
import { useUserFolders } from '../../services/folders/useUserFolders';

export default defineComponent({
  name: 'ListFolder',
  setup() {
    const { result, loading, state, fetchMoreFolder } = useUserFolders();

    function formatDate(strDate: string) {
      const toFormat = new Date(strDate);
      return date.formatDate(+toFormat, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    }

    return {
      state,
      progress1: 0.3,
      progressLabel1: '100%',
      result,
      formatDate,
      loading,
      ...scrollAreaStyle,
      fetchMoreFolder
    };
  }
});
</script>

<style></style>
