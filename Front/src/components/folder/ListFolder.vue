<template>
  <div class="q-pa-md q-gutter-md">
    <q-list
      bordered
      padding
      class="rounded-borders list scroll"
      style="max-width: 500px; max-height: 75vh;"
    >
      <q-item-label header>Liste de dossier</q-item-label>

      <q-item
        v-for="folder in result.userFolders.folders"
        :key="folder.folderId"
        clickable
        v-ripple
      >
        <q-item-section avatar center>
          <q-avatar icon="folder" color="amber" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ folder.client.clientName }}</q-item-label>
          <q-item-label caption class="q-mb-sm">{{
            formatDate(folder.dateTrav)
          }}</q-item-label>
          <q-linear-progress size="xl" :value="progress1" color="orange">
            <div class="absolute-full flex flex-center">
              <q-badge
                color="white"
                text-color="orange"
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
import {
  useUserFolders,
  useUserFoldersVars
} from '../../services/folders/useUserFolders';
import { date } from 'quasar';

export default {
  name: 'ListFolder',
  setup() {
    const { vars } = useUserFoldersVars();
    const { result } = useUserFolders(vars);

    function formatDate(strDate: string) {
      const toFormat = new Date(strDate);
      return date.formatDate(+toFormat, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    }

    return {
      progress1: 0.3,
      progressLabel1: '100%',
      result,
      formatDate
    };
  }
};
</script>

<style></style>
