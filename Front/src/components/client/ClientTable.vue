<template>
  <div class="q-pa-md">
    <q-table
      style="height: 500px; min-Width: 500px"
      title="Liste des Clients"
      :data="state.data"
      :columns="columns"
      :loading="loadingClient"
      row-key="index"
      virtual-scroll
      :pagination.sync="state.pagination"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
      :virtual-scroll-item-size="10"
    />
    <q-btn
      color="orange"
      text-color="black"
      label="test"
      @click="fetchMoreclient()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';

import { useClientsUser } from 'src/services/clients/useClientsUser';

export default defineComponent({
  setup: (_, { root }) => {
    const columns = reactive([
      { name: 'index', label: '#', aalign: 'left', field: 'index' },
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

    function onScroll({ to, ref }) {
      const lastIndex = state.data.length - 1;

      if (state.hasMore === true && !state.stop) {
        fetchMoreclient();
      }
      // console.log({ dataaa: state.data });
    }

    return {
      columns,
      state,
      loadingClient,
      onScroll,
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
