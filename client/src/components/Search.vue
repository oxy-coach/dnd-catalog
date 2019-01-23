<template>
  <div class="search-wrapper">
    <div class="search-header">
      <div class="name-search-wrapper">
        <input class="name-search" type="text" placeholder="Название" v-model="name" @keyup="search">
      </div>
      <div class="level-search-wrapper">
        <span>Уровень:</span>
        <select v-model="level" class="level-search" @change="search">
          <option value="">-</option>
          <option value="0">Заговор</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>
      <div class="ritual-search-wrapper">
        <span>Ритуал:</span>
        <select v-model="ritual" class="ritual-search" @change="search">
          <option value="">-</option>
          <option value="0">Нет</option>
          <option value="1">Да</option>
        </select>
      </div>
    </div>
    <div class="search-results">
      <div class="results-title">Результаты поиска:</div>
      <div class="spells-results">
        <Spell v-for="(spell) in spells" :item="spell" :key="spell.id" />
      </div>
      <div class="empty-result" v-if="!spells.length && searched">Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import Spell from './Spell.vue';

export default {
  data() {
    return {
      name: '',
      level: '',
      ritual: '',
      searched: false,
      spells: [],
    }
  },
  methods: {
    search(){
      this.searched = (this.name || this.level || this.ritual) ? true : false;

      if (!this.searched) return this.spells = [];

      let db = this.$store.state.db.dexie;
      db.spell.toCollection().toArray((res) => {
        
        let spells = res.filter((spell) => {

          if (this.name) {
            let spellName = spell.name.toLowerCase();
            let spellSearch = this.name.toLowerCase();

            if (spellName.indexOf(spellSearch) < 0) {
              return false;
            }
          } 

          if (this.level && (spell.level != this.level)) {
            return false;
          }

          if (this.ritual && (spell.isRitual != this.ritual)) {
            return false;
          }

          return true;
        });

        return spells;
      }).then(spells => this.spells = spells);
    }
  },
  components: {
    Spell
  }
}
</script>

<style lang="scss">
@import './../scss/search.scss';

</style>