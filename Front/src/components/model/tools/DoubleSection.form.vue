<template>
  <div>
    <q-card flat bordered>
      <q-card-section horizontal>
        <!-- left -->
        <q-card flat bordered class="content"> </q-card>

        <!-- right -->
        <q-card flat bordered class="content"> </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return;
  },
});
</script>

<style lang="scss" scoped>
.content {
  width: 200px;
  height: 300px;
  border: 1px solid #c7c7c7;
}
</style>
