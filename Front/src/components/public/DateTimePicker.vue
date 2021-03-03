<template>
  <div class="q-pa-xs">
    <q-input
      dense
      rounded
      outlined
      :value="val"
      v-model="date"
      @change="handleChange"
      readonly
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from 'vue';

type Prop = Readonly<{
  val?: any;
}>;

export default {
  props: ['val'],
  setup(prop: Prop, { emit }: SetupContext) {
    const date = ref(prop.val);

    function handleChange() {
      emit('update:val', date);
    }

    return {
      date,
      handleChange,
    };
  },
};
</script>
