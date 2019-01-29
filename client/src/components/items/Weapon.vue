<template>
  <div class="item-wrapper" :class="{opened: opened}">
    <div class="item-header" @click="toggleWrapper">
      <div class="item-title">{{ weapon.name }}</div>
      <div class="item-header-btn"></div>
    </div>
    <div class="item-body">
      <div class="info-line">Цена: <strong>{{ getPrice }}</strong></div>
      <div class="info-line">Урон: <strong>{{ weapon.damage }} </strong></div>
      <div class="info-line">Вес: <strong>{{ weapon.weight }} ф</strong></div>
      <div class="info-line">Свойства: {{ weapon.properties }}</div>
    </div>
  </div>
</template>

<script>
import Helper from './../../classes/Helper';

export default {
  props: {
    weapon: Object
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
      return Helper.getPrice(this.weapon.price);
    }
  }
}
</script>
