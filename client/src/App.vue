<template>
  <div class="full-width">
    <div class="control">
      <a href="javascript:void(0);" :class="[{loaded : dbLoaded}, loadBtnDefaultClass]" @click="loadBd">Загрузить БД</a>
    </div>
    <h1>Заклинания классов:</h1>
    <div class="result">

      <div v-if="dbInitialized" >
        <div class="database-info" >
            <Class v-for="(classItem) in classList" :classItem="classItem" :key="classItem.id" />
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
import Class from './components/Class.vue';
//import HelloComponent from './components/HelloComponent.vue'

export default {
  data() {
    return {
        dbLoaded: false,
        classList: [],
        loadBtnDefaultClass: 'btn btn-success',
        socket : io('localhost:3031')
    }
  },
  methods: {
    loadBd() {
      if (this.dbLoaded) return false;
      this.socket.emit('db request');
    },
    getClassList() {
      (async () => {
        let list = [];
        await this.getDb.dexie.class.each((model) => {
          list.push(model);
        });
        return list;
      })()
      .then(result => this.classList = result);
    }
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
    this.$store.commit('initDb', new SpellsDb('spells'));

    this.getClassList();

    this.socket.on('db response', (data) => {
      this.dbLoaded = true;
      this.getDb.updateDb(data.db).then(() => {
        console.log('updated');
      });
    });
  },
  components: {
    Class,
  }
}
</script>


<style lang="scss">
@import './scss/app.scss';

</style>
