<template>
  <div style="display: flex; flex-direction: row-reverse">
    <q-btn
      dense
      outline
      :loading="loading_print"
      round
      color="primary"
      @click="print"
      icon="print"
    >
      <q-tooltip>Imprimer</q-tooltip>
      <template v-slot:loading>
        <q-spinner-gears />
      </template>
    </q-btn>
    <iframe v-show="false" id="printA4-frame" name="printA4-frame"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// IMPRIMER CONTENUE
export default defineComponent({
  name: 'FolderHeader',
  components: {},
  setup: () => {
    const loading_print = ref(false);
    function print() {
      loading_print.value = true;

      // Obtenir le contenue à imprimer
      const prtHtml = document.getElementById('printA4').innerHTML;

      // Obtenir les style
      let styleHtml = '';
      for (const node of [
        ...(document.querySelectorAll('link[rel="stylesheet"], style') as any),
      ]) {
        styleHtml += node.outerHTML;
      }

      // Mettre le contenue à imprimer dans un iframe
      document.getElementById('printA4-frame').setAttribute(
        'srcdoc',
        /*html*/ `
      <!DOCTYPE html>
        <html>
          <head>
            ${styleHtml}
            <title>${document.title}</title>
          </head>
          <body>
            ${prtHtml}
          </body>
        </html>
        `
      );

      // Attendre le chrgement du contenue avant d'imprimer
      setTimeout(() => {
        window.frames['printA4-frame'].print();
        loading_print.value = false;
      }, 2000);
    }
    return { print, loading_print };
  },
});
</script>
