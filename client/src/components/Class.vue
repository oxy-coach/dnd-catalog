<template>
  <div class="class-wrapper" :class="{opened: opened}">
    <div class="class-short-info" @click="toggleWrapper">
      <div class="title">{{ classItem.name }}</div>
      <div class="favorites-btn" :class="{favorite: isFavorite}" @click="toggleFavorite"></div>
      <div class="open-info-btn" ></div>
    </div>
    <div class="class-additional-info">
      <div class="class-spells" :class="{opened: spellsOpened}">
        <div class="info-row" @click="toggleClassList">
          <div class="class-info-title" >Заклинания:</div>
          <div class="open-info-btn" ></div>
        </div>
        <div class="description-row">
          <div v-for="(spells, level) in spellsList" :key="level" >
            <div class="level-wrapper">
              <div class="level-short-info" @click="toggleLevelList">
                <div class="level-short-title">
                  <span v-if="level > 0">Уровень {{level}}</span>
                  <span v-else>Заговоры</span>
                </div>
                <div class="open-info-btn" ></div>
              </div>
              <div class="spells-list">
                <Spell v-for="(spell) in spells" :item="spell" :key="spell.id" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Spell from './Spell.vue';

export default {
  props: {
    classItem: Object
  },
  data() {
    return {
      isFavorite: false,
      opened: false,
      spellsLoaded: false,
      spellsOpened: false,
      spellsList: {},
    }
  },
  computed: {
    isFavorite() {
      //return false;
    }
  },
  methods: {
    toggleWrapper() {
      this.opened = !this.opened;

      // загрузить список заклинаний по классам, сгруппированный по уровням
      this.loadSpellsList();
    },
    toggleClassList() {
      this.spellsOpened = !this.spellsOpened;
    },
    toggleLevelList(e) {
      let parentElem = e.target.closest('.level-wrapper');
      parentElem.classList.toggle('opened');
    },
    toggleFavorite(e) {
      e.stopPropagation();
      // добавляем/удаляем из избранных заклинаний
    },
    loadSpellsList(){
      if (this.spellsLoaded) return false;

      (async () => {
        let list = [];

        let collection = this.getDb.dexie.classSpells.where({classId: this.classItem.id});

        await collection.toArray((result) => {
          list = result.map(i => i.spellId);
        })

        collection = this.getDb.dexie.spell.where('id').anyOf(list).sortBy('level');
        await collection.then((result) => {
          list = result;
        });
        
        let groups = {};
        for (let i = 0; i < list.length; i++) {
          let elem = list[i];
          if (groups[elem.level] == undefined) {
            groups[elem.level] = [];
          }
          groups[elem.level].push(elem);
        }

        return groups;
      })().then((result) => {
        this.spellsList = result;
        this.spellsLoaded = true;
      });
    }
  },
  computed: {
    getDb() {
      return this.$store.state.db;
    }
  },
  mounted() {
    
  },
  components: {
    Spell,
  }
}
</script>

<style lang="scss">
  @import './../scss/class.scss';

</style>