<template>
  <div class="print-spell-wrapper" >
    <div class="spell-short-info">
      <div class="title">{{ item.name }} <span v-if="item.isRitual">(Р)</span></div>
      <div class="to-print-btn" :class="{inList: isPrinted}" @click="togglePrinted"></div>
    </div>
    <div class="spell-top-info-block">
      <div class="info-block">
        <div class="title">Время каста</div>
        <div class="info">{{ item.castTime }}</div>
      </div>
      <div class="info-block">
        <div class="title">Дистанция</div>
        <div class="info">{{ item.distance }}</div>
      </div>
      <div class="info-block">
        <div class="title">Компоненты</div>
        <div class="info">
          <span v-if="item.isVerbal">В</span>
          <span v-if="item.isSomatic">С</span>
          <span v-if="item.isMaterial">М</span>
        </div>
      </div>
      <div class="info-block">
        <div class="title">Длительность</div>
        <div class="info"> <span class="has-concentration" v-if="item.hasConcentration">К, </span> {{ item.duration }}</div>
      </div>
    </div>
    <div class="materials-line" v-if="item.isMaterial">{{item.materials}}</div>
    <div class="spell-description">
      <div class="description">
        <div class="text" v-html="item.description"></div>
      </div>
    </div>
    <div class="bottom-description">
      <div class="level-and-school">
        <span class="level">{{ getLevel }}</span>
        <span class="school">{{item.school}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
    }
  },
  computed: {
    getLevel() {
      return (this.item.level == 0) ? 'Заговор' : 'ур. ' + this.item.level;
    },
    getDb() {
      return this.$store.state.db;
    },
    isFavorite() {
      return this.$store.state.favorites.spells.some(i => (i.id == this.item.id));
    },
    isPrinted() {
      return this.$store.state.prints.spells.some(i => (i.id == this.item.id));
    }
  },
  methods: {
    toggleFavorite(e) {
      e.stopPropagation();
      
      if (this.isFavorite) {
        // удаляем из избранных
        this.$store.dispatch('removeSpell', this.item.id);
      } else {
        // добавляем в избранное
        this.$store.dispatch('addSpell', this.item.id);
      }
    },
    togglePrinted(e) {
      e.stopPropagation();
      
      if (this.isPrinted) {
        // удаляем из печати
        this.$store.dispatch('removeSpellPrint', this.item.id);
      } else {
        // добавляем в печать
        this.$store.dispatch('addSpellPrint', this.item.id);
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
  @import './../../scss/print-spell.scss';

</style>