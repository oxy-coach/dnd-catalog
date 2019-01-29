<template>
  <div class="set-wrapper" :class="{opened: opened}">
    <div class="set-header" @click="toggleWrapper">
      <div class="set-title">{{ set.name }}</div>
      <div class="set-header-btn"></div>
    </div>
    <div class="set-body">
      <div class="info-line">Цена: <strong>{{ getPrice }}</strong></div>
      <div class="set-description" v-html="set.description"></div>
    </div>
  </div>
</template>

<script>
import Helper from './../../classes/Helper';

export default {
  props: {
    set: Object
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
      return Helper.getPrice(this.set.price);
    }
  },
}
</script>

<style lang="scss">
@import './../../scss/_variables.scss';

.set-wrapper {
  margin: 10px 0;
  border: 1px solid $lightgray2;
  border-radius: 5px;
  padding: 10px 15px;
  position: relative;
  font-size: 14px;

  .set-header-btn {
    @include open-btn();
    top: 10px;
  }

  .set-title {
    font-size: 1.2em;
    font-weight: bold;

  }

  .set-body {
    display: none;
    border-top: 1px solid $lightgray2;
    padding: 10px;
  }

  .set-description {
    overflow-x: auto;
  }

  .info-line {
    padding: 5px 0 0;
    margin: 5px 0 10px;
  }

  &.opened {
    .set-title {padding: 0 0 5px}
    .set-body {display: block}
    .set-header-btn {transform: rotate(90deg)}
  }
}
</style>
