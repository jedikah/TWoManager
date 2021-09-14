<template>
  <div style="position: relative" class="container">
    <!-- EDIT MODE -->
    <q-card
      v-if="!read_only && !loading"
      flat
      bordered
      class="full-width border"
      style="padding: 5px; padding-top: 2px"
    >
      <q-card-section class="flex row justify-end no-padding">
        <div class="col-2 row">
          <q-space />

          <q-btn
            :disable="index === 0"
            dense
            round
            outline
            color="grey-6"
            icon="arrow_upward"
            @click="onUpWard"
          />

          <q-btn
            :disable="index === lastIndex"
            dense
            round
            outline
            color="grey-6"
            icon="arrow_downward"
            @click="onDownWard"
          />

          <q-space />

          <q-btn
            dense
            round
            outline
            color="deep-orange-6"
            icon="delete_forever"
            @click="onDelete"
          />
        </div>
      </q-card-section>

      <q-card-section horizontal class="full-width">
        <q-card flat bordered class="border" style="width: 48%">
          <q-card-section class="section no-padding">
            <wysiwyg
              v-model="modelLeft"
              @onChange="() => handleChangeValue()"
              tokenLabel="variable"
            ></wysiwyg>
          </q-card-section>
        </q-card>

        <q-card-section style="flex-grow: 1" />

        <q-card flat bordered class="border" style="width: 48%">
          <q-card-section class="section no-padding">
            <wysiwyg
              v-model="modelRight"
              @onChange="() => handleChangeValue()"
              tokenLabel="variable"
            ></wysiwyg>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <!-- PREVIEW MODE -->
    <q-card
      v-if="read_only && !loading"
      flat
      class="full-width preview-card"
      style="padding: 5px 0px; padding-top: 2px"
    >
      <q-card-section horizontal class="full-width no-padding">
        <q-card flat style="width: 48%" class="no-padding">
          <q-card-section class="no-padding" v-html="modelLeft" />
        </q-card>

        <q-card-section style="flex-grow: 1" />

        <q-card flat style="width: 48%">
          <q-card-section class="no-padding" v-html="modelRight" />
        </q-card>
      </q-card-section>
    </q-card>

    <!-- lOADING STATE -->
    <q-card
      v-if="loading"
      flat
      bordered
      class="full-width border full-height card-loading"
      style="padding: 5px; padding-top: 2px"
    >
      <q-card-section horizontal class="full-width full-height">
        <q-card flat bordered class="border" style="width: 49%">
          <q-skeleton
            square
            bordered
            :animation="animation"
            class="
              full-height full-width
              flex
              justify-center
              items-center
              cursor-inherit
            "
            :class="[color]"
          >
            <span style="color: white">1</span>
          </q-skeleton>
        </q-card>

        <q-card flat bordered class="border" style="width: 49%">
          <q-skeleton
            square
            bordered
            :animation="animation"
            class="
              full-height full-width
              flex
              justify-center
              items-center
              cursor-inherit
            "
            :class="[color]"
          >
            <span style="color: white">2</span>
          </q-skeleton>
        </q-card>
      </q-card-section>
    </q-card>

    <q-card v-if="!readOnlyAll" flat class="float-btn">
      <div class="column" style="background: transparent">
        <q-btn
          style="margin: 3px 0"
          v-if="!loading"
          round
          outline
          dense
          color="grey-6"
          :icon="readOnly ? 'layers_clear' : 'layers'"
          @click="readOnly = !readOnly"
        />
        <!-- <q-btn
          style="margin: 3px 0"
          v-if="!loading"
          round
          outline
          dense
          color="grey-6"
          icon="info"
        /> -->
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { SetupContext } from 'vue-demi';

export default defineComponent({
  name: 'DoubleSection',
  components: {
    wysiwyg: require('./DefaultWysiwyg.vue').default,
  },
  props: {
    index: {
      default: 0,
    },
    lastIndex: {
      default: 0,
    },
    readOnlyAll: {
      default: false,
    },
    loading: {
      default: false,
    },
    animation: {
      default: 'wave',
    },
    color: {
      default: 'bg-grey',
    },
    leftVal: {
      default: '',
    },
    rightVal: {
      default: '',
    },
  },
  setup(props, { emit }: SetupContext) {
    const modelLeft = computed({
      get: () => props.leftVal,
      set: (newval) => emit('update:leftVal', newval),
    });
    const modelRight = computed({
      get: () => props.rightVal,
      set: (newval) => emit('update:rightVal', newval),
    });

    const read_only = computed(() => {
      let res = false;
      if (props.readOnlyAll) {
        res = true;
      } else {
        res = readOnly.value;
      }
      return res;
    });

    const readOnly = ref(false);

    function onDelete() {
      emit('onDelete', props.index);
    }

    function onUpWard() {
      if (props.index > 0) {
        emit('upWard', { oldIndex: props.index, newIndex: props.index - 1 });
      }
    }

    function onDownWard() {
      if (props.index < props.lastIndex) {
        emit('downWard', { oldIndex: props.index, newIndex: props.index + 1 });
      }
    }

    function handleChangeValue() {
      emit('onChange', { left: modelLeft.value, right: modelRight.value });
    }

    return {
      read_only,
      readOnly,
      onUpWard,
      onDownWard,
      handleChangeValue,
      modelLeft,
      modelRight,
      onDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.section {
  max-height: calc(6.5cm + 71px);
}

.section:focus {
  box-shadow: 0 0 5px rgb(0, 166, 255);
  border: 1px solid rgb(0, 166, 255);
}

.border {
  border: 1px solid #cccaca !important;
}

.preview-card,
.float-btn {
  border: 1px solid transparent;
}

.float-btn {
  opacity: 0.5;
}

.preview-card:hover + .float-btn,
.float-btn:hover {
  opacity: 1;
}

.float-btn {
  position: absolute;
  right: -38px;
  top: 5px;
  z-index: 100;
}

.container:hover .preview-card {
  border: 1px solid #b5b5b5;
}

.container {
  margin: 10px 0;
}
</style>
