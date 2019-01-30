<template>
  <div class="inventory-wrapper">
    <div class="inventory-title">Ваш инвентарь:</div>
    <div>
      <div v-if="items.length">
        <div class="items-list">
          <Item v-for="(item) in items" :item="item" :key="item.id" @change="inputChange" @delete="removeItem" />
        </div>
        <div class="total-weight">Общий вес: <strong>{{ totalWeight }}</strong> ф</div>
      </div>
      <div class="empty-inventory" v-else>В вашем инвентаре пусто</div>
    </div>
    <div class="controls-btns">
      <button @click="addItem">Добавить предмет</button>
      <button @click="saveItems">Сохранить</button>
    </div>
  </div>
</template>

<script>
import Item from './InventoryItem.vue';

export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    inputChange({id, name, value}) {
      let elem = this.getItem(id);
      if (elem) {
        elem[name] = value;
      }
    },
    removeItem(id){
      let ind = this.getIndex(id);
      this.items.splice(ind, 1);
      console.log(ind);
    },
    addItem(){
      this.items.push({
        id: (this.getBiggestId + 1),
        name: '',
        weight: 1,
        count:1
      });
    },
    getIndex(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == id) return i;
      }
      return;
    },
    getItem(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == id) return this.items[i];
      }
      return;
    },
    saveItems(){
      let inventory = JSON.stringify(this.items);
      localStorage.setItem('inventory', inventory);
    },
    loadItems(){
      if (localStorage.getItem('inventory')) {
        try {
          this.items = JSON.parse(localStorage.getItem('inventory'));
        } catch(e) {
          localStorage.removeItem('inventory');
        }
      }
    }
  },
  computed: {
    getBiggestId() {
      let id = 1;
      this.items.forEach((elem) => {
        id = (elem.id > id) ? elem.id : id;
      });

      return id;
    },
    totalWeight(){
      let weight = 0;
      this.items.forEach((elem) => {
        weight += (elem.weight * elem.count);
      });

      return weight;
    }
  },
  mounted() {
    // получить из бд список инвентаря
    this.loadItems();
  },
  components: {
    Item,
  }
}
</script>

<style lang="scss">
.inventory-wrapper {
  font-family: 'Segoe UI', sans-serif;

  .inventory-title {
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px 0 10px;
  }

  .total-weight {
    padding: 10px 15px;
    margin: 10px 0;
    background-color: #e1e9ff;
    border-radius: 7px;
  }

  .controls-btns {
    margin: 15px 0;
    > button {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 4px;
      border: none;
      background-color: #5cb85c;
      color: white;
      margin: 0 5px;
      font-size: 1em;
      line-height: 1.45;
      outline: none;
      transition: transform .5s;

      &:active {
        background-color: desaturate(#5cb85c, 15%);
        transform: scale(1.2);
      }
    }
  }
}

</style>
