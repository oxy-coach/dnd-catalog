<template>
  <div class="full-width">
    <div class="header">
      <div class="db-refresh" @click="updateDb"></div>
      <div class="header-tab" :class="{active: (3 == activeTab)}" data-tab-id="3" @click="switchTab">Справка</div>
      <div class="header-tab" :class="{active: (1 == activeTab)}" data-tab-id="1" @click="switchTab">Заклинания</div>
      <div class="header-tab" :class="{active: (2 == activeTab)}" data-tab-id="2" @click="switchTab">Вещи</div>
    </div>
    <div class="control">
      <div v-if="dbLoaded">
        <div class="tabs-content-wrapper">
          <div class="tab-content" :class="{active: (1 == activeTab)}">
            <SpellsTab />
          </div>
          <div class="tab-content" :class="{active: (2 == activeTab)}">
            <ItemsTab :items="tabInfo.items" :weapons="tabInfo.weapons" :armor="tabInfo.armor" />
          </div>
          <div class="tab-content" :class="{active: (3 == activeTab)}">
            <Memo />
          </div>
        </div>
        
      </div>
      <div v-else>
        <div class="db-loader">
          <a class="load-db-btn" href="javascript:void(0);" :class="{loaded : dbLoaded}" @click="loadBd">Загрузить базу заклинаний</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpellsDb from './classes/SpellsDb.js';
import SpellsTab from './components/spells/Tab.vue';
import ItemsTab from './components/items/Tab.vue';
import Memo from './components/Memo.vue';
import config from './config.json';
import axios from 'axios';

export default {
  data() {
    return {
      dbLoaded: false,
      backendUrl: config.baseUrl,
      activeTab: 3,
      tabInfo: {
        loaded: false,
        items: {},
        weapons: [],
        armor: [],
      }
    }
  },
  methods: {
    loadBd() {
      if (this.dbLoaded) return false;
      let url = this.backendUrl + '/' + config.dbUrl;

      axios
        .get(url)
        .then((response) => {
          this.dbLoaded = true;
          this.getDb.updateDb(response.data.db).then(() => {
            this.$store.dispatch('update');
          });
        })
        .catch(error => console.log(error));
    },
    updateDb(){
      console.log('update click');
      this.getDb.clearDb().then(() => {
        this.dbLoaded = false;
        this.loadBd();
      });
    },
    switchTab(e) {
      let elem = e.target;

      // обновление инфы для вещей
      this.loadItems().then((res) => {
        this.activeTab = elem.getAttribute('data-tab-id');
      });
    },
    loadItems(){
      return new Promise((resolve) => {
        if (this.tabInfo.loaded) resolve();

        this.getDb.dexie.item.toCollection().toArray((items) => {
          this.$set(this.tabInfo.items, 'items', items);
          return this.getDb.dexie.sets.toCollection().toArray();
        }).then((sets) => {
          this.$set(this.tabInfo.items, 'sets', sets);
          return this.getDb.dexie.tool.toCollection().toArray();
        }).then((tools) => {
          this.$set(this.tabInfo.items, 'tool', tools);
          return this.getDb.dexie.weapon.toCollection().toArray();
        }).then((weapons) => {
          this.$set(this.tabInfo, 'weapons', weapons);
          return this.getDb.dexie.armor.toCollection().toArray();
        }).then((armors) => {
          this.$set(this.tabInfo, 'armor', armors);
          this.tabInfo.loaded = true;
          resolve();
        });
      });
    }
  },
  computed: {
    getDb() {
      return this.$store.state.db;
    }
  },
  mounted() {
    // инициализация db
    this.$store.dispatch('init', new SpellsDb('spells'));

    this.getDb.checkLoad().then(loaded => this.dbLoaded = loaded);

    this.loadBd();
  },
  components: {
    SpellsTab,
    ItemsTab,
    Memo,
  }
}
</script>


<style lang="scss">
@import './scss/app.scss';

</style>
