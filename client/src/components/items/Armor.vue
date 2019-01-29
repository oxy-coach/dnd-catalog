<template>
  <div class="item-wrapper" :class="{opened: opened}">
    <div class="item-header" @click="toggleWrapper">
      <div class="item-title">{{ armor.name }}</div>
      <div class="item-header-btn"></div>
    </div>
    <div class="item-body">
      <div class="info-line" v-if="armor.stealth"><strong><i>Помеха скрытности</i></strong></div>

      <div class="info-line">Цена: <strong>{{ getPrice }}</strong></div>
      <div class="info-line">КД: <strong>{{ armor.ac }}</strong></div>
      <div class="info-line" v-if="armor.strengh">Мин. требования: <strong>{{ armor.strengh }}</strong></div>
      <div class="info-line">Вес: <strong>{{ armor.weight }} ф</strong></div>
    </div>
  </div>
</template>

<script>
import Helper from './../../classes/Helper';

export default {
  props: {
    armor: Object
  },
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    toggleWrapper(){
      this.opened = !this.opened;
    }
  },
  computed: {
    getPrice() {
      return Helper.getPrice(this.armor.price);
    }
  },
}
</script>
