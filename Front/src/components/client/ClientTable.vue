<template>
  <q-table
    style="height: 75vh"
    :columns="columns"
    :rows="clients"
    class="col-12 my-sticky-header-table"
    title="Liste de clients"
    :loading="loadingClient"
    :pagination="state.pagination"
    row-key="name"
    bordered
    flat
  >
    <template v-slot:top-right>
      <q-space />
      <q-btn
        round
        color="amber"
        glossy
        text-color="black"
        icon="add"
        @click="handleOpenAddClientForm"
      />
      <q-space />
    </template>

    <template v-slot:item="props">
      <div class="q-pa-xs col-sm-6 col-md-3 grid-style-transition">
        <q-card :class="props.row.clientName ? 'bg-grey-2' : ''">
          <q-card-section>
            <q-checkbox
              dense
              v-model="props.row.clientName"
              :label="props.row.clientName"
            />
          </q-card-section>
          <q-separator />
          <q-list dense>
            <q-item>
              <q-item-section>
                <q-item-label>test</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>test</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="clientName" :props="props">
          {{ props.row.clientName }}
        </q-td>
        <q-td key="domicile" :props="props">
          {{ props.row.domicile }}
        </q-td>
        <q-td key="contact" :props="props">
          {{ props.row.contact }}
        </q-td>
        <q-td key="action" :props="props">
          <q-btn-group>
            <q-btn dense color="amber">Modifier</q-btn>
            <q-btn dense color="orange">Supprimer</q-btn>
          </q-btn-group>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:bottom>
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
          @update:modelValue="(value) => fetchMoreclient(value)"
        >
        </q-pagination>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { columns } from './client.column';
import { useClientsUser } from '../../services/clients/useClientsUser';
import { formsDrawer } from '../../layouts/MainLayout.vue';
import { clientFormBtn } from './ClientForm.vue';

export default defineComponent({
  setup: () => {
    const {
      state,
      clients,
      variables,
      fetchMoreclient,
      loadingClient,
    } = useClientsUser();

    function handleOpenAddClientForm() {
      formsDrawer.value = true;
      clientFormBtn.value = 'add';
    }

    return {
      state,
      clients,
      variables,
      fetchMoreclient,
      loadingClient,
      columns,
      ...useClientsUser,
      handleOpenAddClientForm,
    };
  },
});
</script>

<style lang="sass">
.my-sticky-header-table
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  &.q-table--loading thead tr:last-child th
    top: 48px
</style>
