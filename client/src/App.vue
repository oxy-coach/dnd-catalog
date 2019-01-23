<template>
  <div class="full-width">
    <div class="header">
      Заклинания
    </div>
    <div class="control">
      <div v-if="dbInitialized">
        <Tab />
      </div>
      <div v-else>
        <a href="javascript:void(0);" :class="[{loaded : dbLoaded}, loadBtnDefaultClass]" @click="loadBd">Загрузить БД</a>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import SpellsDb from './classes/SpellsDb.js';
import Tab from './components/Tab.vue';

export default {
  data() {
    return {
      dbLoaded: false,
      loadBtnDefaultClass: 'btn btn-success',
      socket : io('localhost:3031')
    }
  },
  methods: {
    loadBd() {
      if (this.dbLoaded) return false;
      this.socket.emit('db request');
    },
  },
  computed: {
    dbInitialized() {
      return Boolean(this.getDb);
    },
    getDb() {
      return this.$store.state.db;
    }
  },
  mounted() {
    // инициализация db
    this.$store.dispatch('init', new SpellsDb('spells'));

    this.socket.on('db response', (data) => {
      this.dbLoaded = true;
      this.getDb.updateDb(data.db).then(() => {
        console.log('updated');
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
