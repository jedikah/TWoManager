<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      :columns="columns"
      :data="state.data"
      class="col-12"
      :loading="loadingClient"
      :pagination="state.pagination"
      :rows-per-page-options="[0]"
      row-key="index"
      virtual-scroll
      @virtual-scroll="onLoad"
    >
      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>

        <q-tr
          :props="props"
          :key="`e_${props.row.index}`"
          class="q-virtual-scroll--with-prev"
        >
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';

import { useClientsUser } from 'src/services/clients/useClientsUser';

export default defineComponent({
  setup: (_, { root }) => {
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
      { name: 'contact', label: 'Contact', field: 'contact', sortable: true }
    ]);

    const {
      state,
      variables,
      fetchMoreclient,
      loadingClient
    } = useClientsUser();

    function onLoad({ to, index }) {
      console.log({ lastIndex: state.lastIndex - 1, index, stop: state.stop });
      if (
        state.hasMore === true &&
        state.stop === false &&
        state.lastIndex - 1 <= index
      ) {
        fetchMoreclient();
      } else console.log('not updatable');
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
.my-sticky-dynamic
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
