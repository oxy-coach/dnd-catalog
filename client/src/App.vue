<template>
  <div class="full-width">
    <div class="header">
      <div class="db-refresh" @click="updateDb"></div>
      Заклинания
    </div>
    <div class="control">
      <div v-if="dbLoaded">
        <Tab />
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
import io from 'socket.io-client';
import SpellsDb from './classes/SpellsDb.js';
import Tab from './components/Tab.vue';
import config from './config.json';

export default {
  data() {
    return {
      dbLoaded: false,
      socket : io(config.socket)
    }
  },
  methods: {
    loadBd() {
      if (this.dbLoaded) return false;
      this.socket.emit('db request');
    },
    updateDb(){
      this.getDb.clearDb().then(() => {
        this.dbLoaded = false;
        this.loadBd();
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

    this.socket.on('db response', (data) => {
      this.dbLoaded = true;
      this.getDb.updateDb(data.db).then(() => {
        this.$store.dispatch('update');
      });
    });
  },
  components: {
    Tab,
  }
}
</script>


<style lang="scss">
@import './scss/app.scss';

</style>
