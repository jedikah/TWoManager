<template>
  <q-card flat style="height: calc(100vh - 75px) !important">
    <q-card-section class="flex row full-height q-gutter-md full-height">
      <q-card style="width: 20%">
        <client-form-add v-if="!updateRow" />
        <client-form-update
          v-if="updateRow"
          :client="updateRow"
          @annuler="updateRow = null"
        />
      </q-card>
      <q-card style="padding: 15px; width: 75%" class="full-height">
        <q-table
          dense
          :grid="isGrid"
          :rows="clients"
          :columns="columns"
          :pagination="pagination"
          row-key="name"
          style="max-height: 100%"
          class="sticky-column-table sticky-header-table col-12"
          card-container-style="overflow-y: auto;  margin-top: 5px; margin-left: 2px"
          card-container-class=" q-pa-xs q-gutter-lg q-gutter-md-md q-gutter-sm fa-border"
          no-data-label="Aucune page trouvé..."
        >
          <template v-slot:top>
            <div class="column full-width q-gutter-xs">
              <div class="row q-gutter-sm">
                <!-- <AddPageForm :medias="medias" :categories="categories" /> -->
                <q-toolbar-title class="text-bold">Mes clients</q-toolbar-title>
                <q-space />
                <q-card style="padding: 0 15px">
                  <q-input
                    dense
                    debounce="100"
                    class="col-xs-12 col-md-3 col-lg-2"
                    color="primary"
                    label="Chercher"
                    v-model="queryClientArgs.filter.name"
                  >
                    <template v-slot:append>
                      <q-icon name="search" @click="() => fetchMoreclient()" />
                    </template>
                  </q-input>
                </q-card>
              </div>
              <div class="row q-gutter-xs">
                <div>
                  <q-btn-toggle
                    class="border-primary"
                    dense
                    v-model="isGrid"
                    text-color="primary"
                    color="white"
                    toggle-text-color="white"
                    toggle-color="primary "
                    no-caps
                    :options="[
                      { value: false, slot: 'false' },
                      { value: true, slot: 'true' },
                    ]"
                  >
                    <template v-slot:false>
                      <q-icon name="view_list" />
                      <q-tooltip>Liste</q-tooltip>
                    </template>
                    <template v-slot:true>
                      <q-icon name="apps" />
                      <q-tooltip>Grille</q-tooltip>
                    </template>
                  </q-btn-toggle>
                </div>
              </div>
            </div>
          </template>

          <!-- Table body for table view mod-->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="domicile" :props="props">
                {{ props.row.domicile }}
              </q-td>
              <q-td key="contact" :props="props">
                {{ props.row.contact }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn-group>
                  <q-btn
                    dense
                    color="amber"
                    icon="edit"
                    outline
                    @click="() => onClickUpdate(props.row)"
                  >
                    <q-tooltip>Modifier</q-tooltip>
                  </q-btn>
                  <q-btn dense outline color="negative" icon="delete"
                    ><q-tooltip>Supprimer</q-tooltip></q-btn
                  >
                </q-btn-group>
              </q-td>
            </q-tr>
          </template>

          <!-- Card body for Grid view mod -->

          <template v-slot:item="props">
            <client-table-item
              :data="props"
              @modifier="() => onClickUpdate(props.row)"
            />
          </template>

          <!-- //pagination -->
          <template v-slot:bottom>
            <div class="row full-width justify-center">
              <q-pagination
                v-model="pagination.page"
                :max="pagination.totalPages"
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
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Client } from 'src/services/types';
import { defineComponent, ref } from 'vue';
import { useClients } from '../../services/clients/useClients';
import { columns } from './client.column';

export default defineComponent({
  name: 'ClientTable',
  components: {
    clientTableItem: require('./ClientTable.item.vue').default,
    clientFormAdd: require('./ClientForm.add.vue').default,
    clientFormUpdate: require('./ClientForm.update.vue').default,
  },
  setup() {
    const isGrid = ref(false);
    const filter = ref('');
    const visible = ref(false);

    const updateRow = ref<Client>(null);
    const isUpdate = ref(false);

    function onClickUpdate(val) {
      updateRow.value = val;
      isUpdate.value = true;
    }

    const {
      pagination,
      clients,
      queryClientArgs,
      fetchMoreclient,
      loadingClient,
    } = useClients();

    return {
      columns,
      clients,
      isGrid,
      filter,
      visible,
      pagination,
      fetchMoreclient,
      loadingClient,
      queryClientArgs,
      updateRow,
      onClickUpdate,
      isUpdate,
    };
  },
});
</script>

<style lang="scss">
.sticky-header-table {
  height: 100%;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: white;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }
}
</style>
