<template>
  <div
    style=" box-shadow: 0px 0px 6px 0.2px grey; max-width: 350px; height: 95%;"
  >
    <q-item-label
      header
      style=" font-weight: 900; font-size: 1.2em; text-align: center"
      >Liste de dossier</q-item-label
    >
    <q-separator />
    <q-list
      padding
      class=" list scroll "
      style="max-width: 350px; max-height: 100%; height: 75vh; height: 89% "
    >
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        class=" full-height"
        style="padding: 15px; padding-bottom: 0; padding-top: 0"
      >
        <div
          v-for="folder in !loading ? result.userFolders.folders : []"
          :key="folder.folderId"
        >
          <q-expansion-item dense dense-toggle expand-icon>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-separator />
        </div>
      </q-scroll-area>
    </q-list>
    <q-separator />
    <template style="height: 150px">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useUserFolders } from '../../services/folders/useUserFolders';
import { date } from 'quasar';

export default defineComponent({
  name: 'ListFolder',
  setup() {
    const { result, loading, state, fetchMoreFolder } = useUserFolders();

    function formatDate(strDate: string) {
      const toFormat = new Date(strDate);
      return date.formatDate(+toFormat, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    }

    const scrollAreaStyle = {
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#ff9800',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#ff9800',
        width: '9px',
        opacity: 0.2
      }
    };

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
