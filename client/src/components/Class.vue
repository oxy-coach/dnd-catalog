<template>
  <div class="open-box class-wrapper" :class="{opened: opened}">
    <div class="class-short-info" @click="toggleWrapper">
      <div class="title">{{ classItem.name }}</div>
      <div class="favorites-btn" :class="{favorite: isFavorite}" @click="toggleFavorite"></div>
      <div class="open-info-btn" ></div>
    </div>
    <div class="open-box-description class-additional-info">
      <div class="open-box class-magic-info" :class="{opened: magicInfoOpened}">
        <div class="info-row" @click="toggleMagicInfo">
          <div class="class-info-title" >Доп. информация:</div>
          <div class="open-info-btn" ></div>
        </div>
        <div class="open-box-description description-row" v-html="classItem.spellsInfo"></div>
      </div>
      <div class="open-box class-spells" :class="{opened: spellsOpened}">
        <div class="info-row" @click="toggleClassList">
          <div class="class-info-title" >Заклинания:</div>
          <div class="open-info-btn" ></div>
        </div>
        <div class="open-box-description description-row">
          <div v-for="(spells, level) in spellsList" :key="level" >
            <div class="open-box level-wrapper">
              <div class="level-short-info" @click="toggleLevelList">
                <div class="level-short-title">
                  <span v-if="level > 0">Уровень {{level}}</span>
                  <span v-else>Заговоры</span>
                </div>
                <div class="open-info-btn" ></div>
              </div>
              <div class="open-box-description spells-list">
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
      magicInfoOpened: false,
      spellsList: {},
    }
  },
  computed: {
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
    toggleMagicInfo() {
      this.magicInfoOpened = !this.magicInfoOpened;
    },
    toggleLevelList(e) {
      let parentElem = e.target.closest('.level-wrapper');
      parentElem.classList.toggle('opened');
    },
    toggleFavorite(e) {
      e.stopPropagation();

      if (this.isFavorite) {
        // удаляем из избранных
        (async () => {
          this.getDb.dexie.favoriteClass.where({classId: this.classItem.id}).delete().then(() => {
            this.isFavorite = !this.isFavorite;
          });
        })();
      } else {
        // добавляем в избранное
        (async () => {
          this.getDb.dexie.favoriteClass.put({classId: this.classItem.id}).then(() => {
            this.isFavorite = !this.isFavorite;
          });
        })();
      }
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
    (async () => {
      this.getDb.dexie.favoriteClass.where({classId: this.classItem.id}).count().then((result) => {
        this.isFavorite = Boolean(result);
      });
    })();
  },
  components: {
    Spell,
  }
}
</script>

<style lang="scss">
  @import './../scss/class.scss';

</style>