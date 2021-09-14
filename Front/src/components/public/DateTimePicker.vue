<template>
  <div class="q-pa-xs" @mouseover="show = true" @mouseleave="show = false">
    <q-input dense rounded outlined v-model="date" readonly>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date
              v-model="date"
              @update:modelValue="(date) => handleChange(date)"
              mask="YYYY-MM-DD HH:mm"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>

          <q-tooltip v-model="show">
            Cliquer <q-icon name="event" /> pour changer la date.
          </q-tooltip>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time
              v-model="date"
              @update:modelValue="(date) => handleChange(date)"
              mask="YYYY-MM-DD HH:mm"
              format24h
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat>
                </q-btn>
              </div>
            </q-time>
          </q-popup-proxy>

          <q-tooltip v-model="show">
            Cliquer <q-icon name="access_time" /> pour changer l'heure.
          </q-tooltip>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, SetupContext } from 'vue';

type Prop = Readonly<{
  val?: any;
}>;

export default {
  props: ['val'],
  setup(prop: Prop, { emit }: SetupContext) {
    const date = ref(prop.val);

    const show = ref(false);

    function handleChange(date: string) {
      emit('update:val', date);
    }

    onMounted(() => {
      handleChange(prop.val);
    });

    return {
      date,
      handleChange,
      show,
    };
  },
};
</script>
