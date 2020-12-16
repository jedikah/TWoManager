<template>
  <q-table
    style="height: 75vh"
    :columns="columns"
    :data="!loadingClient ? result.userClients.clients : []"
    class="col-12 my-sticky-header-table"
    :loading="loadingClient"
    :pagination.sync="state.pagination"
    row-key="index"
  >
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
          @input="e => fetchMoreclient(e)"
        >
        </q-pagination>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { columns } from './client.column';
import { useClientsUser } from '../../services/clients/useClientsUser';

export default defineComponent({
  setup: () => {
    const {
      state,
      result,
      variables,
      fetchMoreclient,
      loadingClient
    } = useClientsUser();

    return {
      state,
      result,
      variables,
      fetchMoreclient,
      loadingClient,
      columns,
      ...useClientsUser
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
