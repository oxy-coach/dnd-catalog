<template>
  <div class="full-width">
    <div class="control">
      <a href="javascript:void(0);" :class="[{loaded : dbLoaded}, loadBtnDefaultClass]" @click="loadBd">Загрузить БД</a>
    </div>
    <div class="result">

      <div v-if="dbInitialized" >
        <div class="database-info" >
          <pre>
            {{ dexieDb.dexie.class.name }}
          </pre>
        </div>
      </div>
      <div v-else>
        <p>
          БД не загружена
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import SpellsDb from './classes/SpellsDb.js';
//import HelloComponent from './components/HelloComponent.vue'

export default {
  data() {
    return {
        dexieDb: {},
        dbLoaded: false,
        dbInitialized: false,
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
  },
  mounted() {
    // инициализация db
    this.dexieDb = new SpellsDb('spells');
    console.log('initialized');
    this.dbInitialized = true;

    this.socket.on('db response', (data) => {
      this.dbLoaded = true;
      this.dexieDb.updateDb(data.db).then(() => {console.log('updated')});
    });
  },
  components: {
  }
}
</script>


<style lang="scss">
@import './scss/app.scss';


</style>
