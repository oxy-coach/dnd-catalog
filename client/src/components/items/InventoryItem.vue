<template>
  <div class="item-wrapper">
    <div class="item-title-wrapper">
      <input type="text" placeholder="Название" :value="item.name" @change="$emit('change', {id: item.id, name: 'name', value: $event.target.value})">
    </div>
    <div class="item-weight-wrapper">
      <span>Вес (ф):</span> <input type="text" class="number-input" placeholder="Вес" :value="item.weight" @change="$emit('change', {id: item.id, name: 'weight', value: Number($event.target.value)})"> 
    </div>
    <div class="item-count-wrapper">
      <span>Кол-во: </span>
      <button class="change-count-btn" @click="decrement">-</button>
      <input type="number" class="number-input" :value="item.count" @change="$emit('change', {id: item.id, name: 'count', value: Number($event.target.value)})">
      <button class="change-count-btn" @click="increment">+</button>
    </div>

    <div class="item-total-wrapper"><span>Общий вес:</span> {{ totalWeight }}</div>
    <button class="remove-item-btn" @click="$emit('delete', item.id)">X</button>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {}
  },
  computed: {
    totalWeight() {
      return this.item.weight * this.item.count;
    }
  },
  methods: {
    increment(){
      let count = Number(this.item.count) + 1;
      this.$emit('change', {id: this.item.id, name: 'count', value: count});
    },
    decrement(){
      if (this.item.count <= 1) return false;
      let count = Number(this.item.count) - 1;
      this.$emit('change', {id: this.item.id, name: 'count', value: count});
    }
  }
}
</script>

<style lang="scss">
.item-wrapper {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  position: relative;
  padding-right: 50px;

  > div {
    display: inline-block;
    width: auto;

    span {
      font-size: .8em;
    }
  }

  input {
    border: none;
    font-weight: bold;
    font-size: 1em;
    outline: none;
    padding: 5px 0;

    &:focus {
      border-bottom: 1px solid #e0e0e0;
    }
  }

  .item-title-wrapper {
    font-size: 1.1em;
    width: 100%;
    margin-bottom: 5px;

    input {
      font-weight: 100;
      width: 100%;
    }
  }

  .item-total-wrapper {
    width: 100%;
  }

  .number-input {
    display: inline-block;
    width: auto;
    max-width: 30px;
    padding: 5px;
  }

  .change-count-btn {
    background-color: #effff1;
    border: 1px solid #ababab;
    border-radius: 3px;
    padding: 5px 10px;
  }

  .remove-item-btn {
    position: absolute;
    display: block;
    background-color: #e2aaaa;
    border: 1px solid #e1e1e1;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    border-radius: 5px;
  }
}
</style>
