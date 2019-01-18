<template>
  <div class="full-width">
    <div class="control">
      <a href="javascript:void(0);" :class="[{loaded : dbLoaded}, loadBtnDefaultClass]" @click="loadBd">Загрузить БД</a>
    </div>
    <div class="result">

      <div v-if="dbInitialized" >
        <div class="database-info" >
          <h3>Классы:</h3>
          <ul class="classes" v-for="(name) in classList" :key="name">
            <li>{{ name }}</li>
          </ul>
          <h3>Заклинания:</h3>
          <ul class="classes" v-for="(spell) in spellsList" :key="spell.id">
            <li>{{ spell.name }} ({{ spell.level }} уровень)</li>
          </ul>
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
        classList: [],
        spellsList: [],
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
        await this.dexieDb.dexie.class.each((model) => {
          list.push(model.name);
        });
        return list;
      })()
      .then(result => this.classList = result);
    },
    getSpellsList() {
      (async () => {
        let list = [];
        let collection = this.dexieDb.dexie.spell.toCollection().sortBy('level');
        await collection.then((result) => {
         list = result;
        })
        return list;
      })()
      .then(result => this.spellsList = result);
    }
  },
  computed: {
  },
  mounted() {
    // инициализация db
    this.dexieDb = new SpellsDb('spells');
    this.dbInitialized = true;

    this.getClassList();
    this.getSpellsList();

    this.socket.on('db response', (data) => {
      this.dbLoaded = true;
      this.dexieDb.updateDb(data.db).then(() => {
        console.log('updated')
      });
    });
  },
  components: {
  }
}
</script>


<style lang="scss">
@import './scss/app.scss';


</style>
