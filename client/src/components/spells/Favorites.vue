<template>
  <div class="favorites-wrapper">
    <div class="favorite-classes" v-if="!emptyClasses">
      <div class="favorites-title">Избранные классы:</div>
      <div class="favorites-list">
        <Class v-for="(classItem) in getFavorites.classes" :classItem="classItem" :key="classItem.id" />
      </div>
    </div>
    <div class="favorite-spells" v-if="!emptySpells">
      <div class="favorites-title">Избранные заклинания:</div>
      <div class="favorites-list">
        <Spell v-for="(spell) in getFavorites.spells" :item="spell" :key="spell.id" />
      </div>
    </div>
    <div class="empty-message" v-if="emptyClasses && emptySpells">В вашем списке избранного пусто</div>
  </div>
</template>

<script>
import Class from './Class.vue';
import Spell from './Spell.vue';

export default {
  data() {
    return {
    };
  },
  computed: {
    getDb() {
      return this.$store.state.db;
    },
    getFavorites() {
      return this.$store.state.favorites;
    },
    emptyClasses() {
      return !Boolean(this.getFavorites.classes.length);
    },
    emptySpells() {
      return !Boolean(this.getFavorites.spells.length);
    }
  },
  methods: {
  },
  mounted() {
  },
  components: {
    Class,
    Spell
  }
}
</script>

<style lang="scss">
  .favorites-title {
    font-weight: bold;
    padding: 5px 10px;
  }
  .empty-message {
    font-weight: bold;
    font-style: italic;
    padding: 5px 10px;
  }
</style>

