<template>
  <div class="item-wrapper" :class="{opened: opened}">
    <div class="item-header" @click="toggleWrapper">
      <div class="item-title">{{ item.name }}</div>
      <div class="item-header-btn"></div>
    </div>
    <div class="item-body">
      <div class="info-line">Цена: <strong>{{ getPrice }}</strong></div>
      <div class="info-line">Вес: <strong>{{ item.weight }} ф</strong></div>
    </div>
  </div>
</template>

<script>
import Helper from './../../classes/Helper';

export default {
  props: {
    item: Object
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
      return Helper.getPrice(this.item.price);
    }
  },
}
</script>

<style lang="scss">

  @import './../../scss/_variables.scss';

.item-wrapper {
  margin: 10px 0;
  border: 1px solid $lightgray2;
  border-radius: 5px;
  padding: 10px 15px;
  position: relative;
  font-size: 14px;

  .item-header {
    cursor: pointer;
  }
  
  .item-header-btn {
    @include open-btn();
    top: 10px;
  }

  .item-title {
    font-size: 1.2em;
    font-weight: bold;

  }

  .item-body {
    display: none;
    border-top: 1px solid $lightgray2;
    padding: 10px;
  }

  .info-line {
    padding: 5px 0 0;
  }

  &.opened {
    .item-title {padding: 0 0 5px}
    .item-body {display: block}
    .item-header-btn {transform: rotate(90deg)}
  }
}
</style>
