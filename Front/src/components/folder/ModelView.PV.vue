<template>
  <div
    class="paddingA4"
    style="display: flex; flex-direction: column; justify-content: center; width: 100%; "
  >
    <div
      style="display: flex; flex-direction: row; justify-content: center; width: 100%; "
    >
      <!-- HEAD -->

      <div style="width: 45%">
        <span style="line-height: 0; font-weight: 900">
          <p>REPOBLIKAN ‘ I MADAGASKARA</p>
          <p>Fitiavana-Tanindrazana-Fandrosoana</p>
        </span>
        <p style="height: 10px"></p>

        <div
          style="line-height: 0; font-weight: 900; text-align: center;  text-decoration: underline; padding: 0"
        >
          <p>CIRCONSCRIPTION TOPOGRAPHIQUE</p>
          <p>DE SAMBAVA</p>
        </div>
      </div>
      <div style="width: 10%"></div>

      <div style="width: 45%; ">
        <span style="line-height: 0; font-weight: 900; text-align: center">
          <p>P R O C E S - V E R B A L</p>
        </span>
        <p style="height: 10px"></p>

        <div style="line-height: 0; font-weight: 900;">
          <p>de morcellement</p>
          <p>Propriété dite : {{ groundName }}</p>
          <p>Réquisition N°{{ requisition }}, Titre N°{{ title }}</p>
        </div>
      </div>
    </div>

    <!-- MAIN 1 -->

    <div style="margin-top: 20px">
      <p>
        Sise à Mahatsara, Fokontany d’Antohomaro, Commune rurale de Farahalana,
        District de Sambava, Région SAVA
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import { pvHtmlString } from './PV.docx';

export default defineComponent({
  name: 'PvView',
  setup() {
    return {
      groundName: ' VILLA CASTIANA',
      requisition: '- - - - - - -',
      title: '5780-DH'
    };
  }
});
</script>

<style>
.paddingA4 {
  padding: 50px;
}
</style>
