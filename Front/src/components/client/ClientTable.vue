<template>
  <div class="q-pa-md">
    <q-table
      style="height: 75vh"
      :columns="columns"
      :data="state.data"
      class="col-12 my-sticky-header-table"
      :loading="loadingClient || state.loadingTableRow"
      :pagination="state.pagination"
      :rows-per-page-options="[0]"
      row-key="index"
      virtual-scroll
      :virtual-scroll-sticky-size-end="40"
      :virtual-scroll-sticky-size-start="0"
      @virtual-scroll="onLoad"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props">
            {{ props.row.index }}
          </q-td>
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
              <q-btn color="amber">Modifier</q-btn>
              <q-btn color="orange">Supprimer</q-btn>
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    {{ state.data }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';

import { useClientsUser } from 'src/services/clients/useClientsUser';

export default defineComponent({
  setup: () => {
    const columns = reactive([
      {
        name: 'index',
        label: '#',
        align: 'left',
        field: cols => `${cols.index}`
      },
      {
        name: 'clientName',
        required: true,
        label: 'Nom et Prenom',
        align: 'left',
        field: 'clientName',
        format: val => `${val}`,
        sortable: true
      },
      {
        name: 'domicile',
        align: 'center',
        label: 'Domicile',
        field: 'domicile',
        sortable: true
      },
      {
        name: 'contact',
        label: 'Contact',
        field: 'contact',
        sortable: true,
        align: 'center'
      },
      {
        name: 'action',
        label: 'Action',
        field: 'action',
        sortable: false,
        align: 'center'
      }
    ]);

    const {
      state,
      variables,
      fetchMoreclient,
      loadingClient
    } = useClientsUser();

    function onLoad({ index }) {
      if (
        state.meta.currentPage < state.meta.totalPages &&
        index >= state.lastIndex - 10 &&
        state.loadingTableRow === false
      ) {
        state.loadingTableRow = true;
        fetchMoreclient(state.meta.currentPage + 1);
        setTimeout(() => {
          state.loadingTableRow = false;
        }, 500);
      }
    }

    return {
      columns,
      state,
      loadingClient,
      onLoad,
      variables,
      fetchMoreclient
    };
  }
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
