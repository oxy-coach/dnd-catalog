<template>
  <div class="spell-wrapper" :class="{opened: opened}" >
    <div class="spell-short-info" @click="toggleWrapper">
      <div class="title">{{ item.name }}</div>
      <div class="info-icons level">{{ getLevel }}</div>
      <div class="info-icons concentration" v-if="item.hasConcentration">К</div>
      <div class="info-icons ritual" v-if="item.isRitual">Р</div>
      <div class="favorites-btn" :class="{favorite: isFavorite}" @click="toggleFavorite"></div>
      <div class="open-info-btn" ></div>
    </div>
    <div class="spell-description">
      <div class="info">
        <div class="info-line" v-if="item.isRitual"> <i>Ритуал</i> </div>
        <div class="info-line"> <span>Время накладывания:</span> {{ item.castTime }} </div>
        <div class="info-line"> <span>Дистанция:</span> {{ item.distance }} </div>
        <div class="info-line"> 
          <span>Компоненты:</span>  
          <p data-component="verbal" v-if="item.isVerbal" >В</p> 
          <p data-component="somatic" v-if="item.isSomatic" >С</p> 
          <p data-component="material" v-if="item.isMaterial" >М</p> 
        </div>
        <div class="info-line" v-if="item.isMaterial"> <span>Материалы:</span>  {{item.materials}} </div>
        <div class="info-line" v-if="item.hasConcentration"> <span>Концентрация:</span> Да </div>
        <div class="info-line"> <span>Длительность:</span> {{ item.duration }} </div>
      </div>
      <div class="description">
        <div class="title">Описание:</div>
        <div class="text" v-html="item.description"></div>
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
      opened: false,
    }
  },
  computed: {
    getLevel() {
      return (this.item.level == 0) ? 'Заговор' : 'ур. ' + this.item.level;
    },
    isFavorite() {
      return false;
    }
  },
  methods: {
    toggleWrapper(e) {
      this.opened = !this.opened;
    },
    toggleFavorite(e) {
      e.stopPropagation();
      // добавляем/удаляем из избранных заклинаний
    }
  }
}
</script>

<style lang="scss">
  @import './../scss/spell.scss';

</style>