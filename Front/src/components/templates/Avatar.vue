<template>
  <!--Avatar-->
  <div
    class="column justify-center items-center q-gutter-xs"
    style="padding: 0px; margin: 0px"
  >
    <q-avatar :size="size" style="background: #1976d217">
      <q-img :src="src" />
      <q-icon v-if="src === ''" name="face" class="cursor-pointer" />
    </q-avatar>
    <p class="text-h6">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({ name: 'Avatar' })
export default class Avatar extends Vue {
  @Prop({ required: false, default: '' })
  readonly src: string | ArrayBuffer;

  @Prop({ required: false, type: String, default: '125px' })
  readonly size: string;

  @Prop({ required: false, default: 'Nom et Prenom' })
  readonly name: string;
}
</script>
