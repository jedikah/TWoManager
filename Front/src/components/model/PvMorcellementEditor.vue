<template>
  <div class="">
    <q-editor
      style="height: 322mm; width: 210mm"
      v-model="modelState.pv.morcellement"
      :dense="$q.screen.lt.md"
      ref="pv_morcellement_editor"
      :toolbar="toolbar($q)"
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
      <template v-slot:token>
        <q-btn-dropdown
          dense
          no-caps
          ref="token"
          no-wrap
          unelevated
          color="white"
          text-color="primary"
          label="Token"
          size="sm"
        >
          <q-list dense>
            <q-item tag="label" clickable @click="add('email')">
              <q-item-section side>
                <q-icon name="mail" />
              </q-item-section>
              <q-item-section>Email</q-item-section>
            </q-item>
            <q-item tag="label" clickable @click="add('title')">
              <q-item-section side>
                <q-icon name="title" />
              </q-item-section>
              <q-item-section>Title</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useSession } from 'src/services/session/useSession';
// import { dateParse } from '../../utils/dateParse';
import { toolbar } from './PvMorcellementEditor.toolbar';
import { useModel } from '../../services/model/model.globaleState';

export default defineComponent({
  name: 'PvMorcellementEditor',
  setup() {
    const { modelState } = useModel();

    function add(name: string) {
      const edit = this.$refs.pv_morcellement_editor;
      this.$refs.token.hide();
      edit.caret.restore();
      edit.runCmd(
        'insertHTML',
        `&nbsp;<span class="editor_token row inline items-center" contenteditable="false">&nbsp;<span>${name}</span></span>&nbsp;`
      );
      edit.focus();
      console.log({ edit });
    }

    return { add, modelState, toolbar };
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
