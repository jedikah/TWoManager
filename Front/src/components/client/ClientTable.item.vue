<template>
  <q-card class="q-ma-sm column col-lg-2 card-container" style="height: 300px">
    <q-card-section horizontal class="full-width">
      <q-item
        class="bg-primary full-width text-white text-bold no-padding row"
        style="min-height: 30px"
      >
        <q-avatar
          rounded
          style="width: 30px; height: 30px; margin: 5px 2px"
          color="white"
          text-color="primary"
        >
          {{ data.row.name.slice(0, 1).toUpperCase() }}
        </q-avatar>
        <div class="card-name" style="margin: 5px 2px">
          {{ data.row.name }}
        </div>
      </q-item>
    </q-card-section>

    <q-space />

    <q-card-section
      horizontal
      class="flex justify-center items-center relative-position flip-parent"
    >
      <div class="full-width full-height flip-out" style="">
        <div rounded class="full-width full-height">
          <img class="full-width full-height" src="~assets/client-item.png" />
        </div>
      </div>

      <div class="full-width full-height absolute flip-in">
        <q-list dense>
          <q-item
            v-for="col in data.cols.filter((i) => i.name !== 'action')"
            :key="col.name"
          >
            <q-item-section>
              <q-item-label lines="1">{{ col.label }}</q-item-label>
              <q-item-label class="text-right" caption lines="2">{{
                data.row[col.name]
              }}</q-item-label>
              <q-separator />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>

    <q-space />

    <q-card-actions
      vertical
      class="row justify-center no-padding"
      align="center"
    >
      <q-btn-group outline class="full-width">
        <q-btn
          dense
          outline
          color="amber"
          icon="edit"
          @click="$emit('modifier')"
        >
          <q-tooltip>Modifier</q-tooltip>
        </q-btn>
        <q-separator />
        <q-btn
          dense
          outline
          color="negative"
          icon="delete"
          @click="$emit('supprimer')"
        >
          <q-tooltip>Supprimer</q-tooltip>
        </q-btn>
      </q-btn-group>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'PageItems',
  components: {},
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const morphGroupModel = ref('img');

    return {
      morphGroupModel,
    };
  },
});
</script>

<style lang="scss" scoped>
// .flip-parent {
//   // border: 1px solid red;
// }

.flip-out {
  transform: rotateY(0deg);
  transition: transform ease-out 200ms;
}

.card-container:hover > .flip-parent > .flip-out {
  transform: rotateY(90deg);
}

.card-container:not(:hover) > .flip-parent > .flip-out {
  transition-delay: 200ms;
}

.flip-in {
  padding-top: 10px;
  transform: rotateY(90deg);
  transition: transform ease-in 200ms;
  transition-property: revert;
}

.card-container:hover > .flip-parent > .flip-in {
  transform: rotateY(0deg);
  transition-delay: 200ms;
}

.card-name {
  line-height: 25px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
