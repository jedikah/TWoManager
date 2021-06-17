<template>
  <div class="">
    <q-editor
      style="width: 210mm"
      height="70vh"
      max-height="297mm"
      v-model="content"
      :model-value="currentModel"
      :dense="$q.screen.lt.md"
      ref="editorRef"
      :toolbar="toolbar_pv($q)"
      toolbar-text-color="white"
      toolbar-toggle-color="yellow-8"
      toolbar-bg="primary"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
      }"
    >
      <template v-slot:paragraph1>
        <q-btn-dropdown
          dense
          no-caps
          ref="paragraph1"
          color="white"
          text-color="primary"
          label="Paragraph 1"
          size="sm"
        >
          <q-list dense>
            <q-item
              dense
              v-for="item in data_pv.paragraph1"
              :key="item"
              tag="label"
              clickable
              @click="add('#' + item, 'paragraph1')"
            >
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>

      <template v-slot:paragraph2>
        <q-btn-dropdown
          dense
          no-caps
          ref="paragraph2"
          color="white"
          text-color="primary"
          label="Paragraph 2"
          size="sm"
        >
          <q-list dense>
            <q-item
              dense
              v-for="item in data_pv.paragraph2"
              :key="item"
              tag="label"
              clickable
              @click="add('#' + item, 'paragraph2')"
            >
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>

      <template v-slot:paragraph3>
        <q-btn-dropdown
          dense
          no-caps
          ref="paragraph3"
          color="white"
          text-color="primary"
          label="Paragraph 3"
          size="sm"
        >
          <q-list dense>
            <q-item
              dense
              v-for="item in data_pv.paragraph3"
              :key="item"
              tag="label"
              clickable
              @click="add('#' + item, 'paragraph3')"
            >
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>

      <template v-slot:paragraph4>
        <q-btn-dropdown
          dense
          no-caps
          ref="paragraph4"
          color="white"
          text-color="primary"
          label="Paragraph 4"
          size="sm"
        >
          <q-list dense>
            <q-item
              dense
              v-for="item in data_pv.paragraph4"
              :key="item"
              tag="label"
              clickable
              @click="add('#' + item, 'paragraph4')"
            >
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>

      <template v-slot:paragraph5>
        <q-btn-dropdown
          dense
          no-caps
          ref="paragraph5"
          color="white"
          text-color="primary"
          label="Paragraph 5"
          size="sm"
        >
          <q-list dense>
            <q-item
              dense
              v-for="item in data_pv.paragraph5"
              :key="item"
              tag="label"
              clickable
              @click="add('#' + item, 'paragraph5')"
            >
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>

      <template v-slot:paragraph6>
        <q-btn-dropdown
          dense
          no-caps
          ref="paragraph6"
          color="white"
          text-color="primary"
          label="Paragraph 6"
          size="sm"
        >
          <q-list dense>
            <q-item
              dense
              v-for="item in data_pv.paragraph6"
              :key="item"
              ref="paragraph6"
              tag="label"
              clickable
              @click="add('#' + item, 'paragraph6')"
            >
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';

import { toolbar_pv, data_pv } from './Editor.pvOptions';
import { editorViewerState, useModel } from '../../services/model/useModels';

export default defineComponent({
  name: 'Editor',
  props: {
    editorName: {
      require: true,
      type: String,
    },
    value: {
      require: true,
      default: '',
    },
    items: {
      require: false,
      type: Object,
      default: () => ({ data1: Array, data2: Array, data3: Array }),
    },
  },
  setup: (props) => {
    const { currentModel } = useModel();

    const content = ref();
    const editorRef = ref(null);

    const refs: { [T: string]: Ref } = {
      paragraph1: ref(null),
      paragraph2: ref(null),
      paragraph3: ref(null),
      paragraph4: ref(null),
      paragraph5: ref(null),
      paragraph6: ref(null),
    };

    function add(name: string, refName: string) {
      const edit = editorRef.value;
      refs[refName].value.hide();
      // edit.caret.restore();
      edit.runCmd(
        'insertHTML',
        `&nbsp;<span class="editor_token row inline items-center" contenteditable="false">&nbsp;<span>${name}</span></span>&nbsp;`
      );
      edit.focus();
    }

    return {
      add,
      toolbar_pv,
      content,
      data_pv,
      ...refs,
      editorRef,
      currentModel,
    };
  },
});
</script>

<style lang="sass">
.editor_token
  background: rgba(0, 0, 0, .6)
  color: white
  padding: 3px
  &, .q-icon
    border-radius: 3px
  .q-icon
    background: rgba(0, 0, 0, .2)
</style>
