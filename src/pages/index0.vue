<template>
  <q-page class="fullscreen row items-center  justify-center">
    <div style="min-width: 800px">
      <q-stepper
        v-model="step"
        header-nav
        ref="stepper"
        color="primary"
        animated
        style="width: 810px; height: 600px"
      >
        <q-step
          style="height: 525px"
          :name="1"
          title="Condition d'utilisation"
          icon="policy"
          :done="step > 1"
          :header-nav="step > 1"
        >
          <term-of-use
            style="height: 350px; box-shadow: 0px 0px 2px 0px grey"
          />

          <q-stepper-navigation style="height: 50px;">
            <div class="col">
              <div>
                <q-checkbox
                  v-model="checkbox"
                  label="J'accepte les termes et conditions d'utilisation"
                  color="teal"
                />
              </div>
              <div>
                <q-btn
                  :disable="!checkbox"
                  @click="
                    () => {
                      done1 = true;
                      step = 2;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
              </div>
            </div>
          </q-stepper-navigation>
        </q-step>

        <q-step
          style="height: 525px"
          :name="2"
          title="Chemin de stockage des donnees"
          icon="folder"
          :done="step > 2"
          :header-nav="step > 2"
        >
          <db-path-selector style="height: 350px;" />

          <q-stepper-navigation class="col">
            <div style="height: 40px"></div>
            <div>
              <q-btn
                @click="
                  () => {
                    checkPath()
                      ? ((done2 = true), (step = 3))
                      : ((pathAlert = true), setMessaType('path'));
                  }
                "
                color="primary"
                label="Continue"
              />
              <q-btn
                flat
                @click="step = 1"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
            </div>
          </q-stepper-navigation>
        </q-step>

        <q-step
          style="height: 525px"
          :name="3"
          title="Creation compte"
          icon="account_circle "
          :header-nav="step > 3"
        >
          <register style="height: 350px;" />

          <q-stepper-navigation>
            <div style="height: 40px"></div>
            <div>
              <q-btn
                color="primary"
                @click="
                  () => {
                    done3 = true;
                    checkRegister()
                      ? ((done3 = true), app.relaunch(), app.exit())
                      : ((pathAlert = true), setMessaType('register'));
                  }
                "
                label="Finish"
              />
              <q-btn
                flat
                @click="step = 2"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
            </div>
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
      <!-- alert path -->
      <q-dialog v-model="pathAlert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{
              messageType === 'path'
                ? 'Vous devez choisir un dossier où stocker vos données.'
                : ''
            }}
            {{
              messageType === 'register'
                ? 'Vous devez créer un compte utilisateur pour Terminer.'
                : ''
            }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" @click="pathAlert = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const electron = require('electron');
const Store = require('electron-store');
const store = new Store();

@Component({
  name: 'Index',
  components: {
    'term-of-use': require('src/components/TermOfUse.vue').default,
    'db-path-selector': require('src/components/DBPathSelector.vue').default,
    register: require('src/components/Register0.vue').default
  }
})
export default class Index extends Vue {
  private path = store.get('path') || null;
  private app = electron.remote.app;
  private step = 1;
  private checkbox = false;
  private pathAlert = false;
  private messageType = '';

  mounted() {
    //
  }
  checkPath() {
    return store.get('path') || null;
  }
  checkRegister() {
    return store.get('register') || null;
  }
  setMessaType(message: string) {
    this.messageType = message;
  }
}
</script>
