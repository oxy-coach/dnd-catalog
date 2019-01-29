<template>
  <div class="items-tab-wrapper">
    <div class="tabs-header">
      <div class="tab-link" :class="{active: (1 == activeTab)}" data-tab-id="1" @click="switchTab">Предметы</div>
      <div class="tab-link" :class="{active: (2 == activeTab)}" data-tab-id="2" @click="switchTab">Оружие</div>
      <div class="tab-link" :class="{active: (3 == activeTab)}" data-tab-id="3" @click="switchTab">Доспехи</div>
    </div>
    <div class="tabs-content-wrapper">

      <div class="tab-content" :class="{active: (1 == activeTab)}">
        <div class="items-title">Предметы</div>
        <div class="items-groups">
          <div class="item-group-wrapper" v-for="(group) in grouppedItems" :key="group.name">
            <div class="item-group-title">{{ group.name }}</div>
            <div class="item-group-items">
              <Item v-for="(item) in group.items" :item="item" :key="item.id" />
            </div>
          </div>
        </div>

        <div class="items-title">Наборы</div>
        <div class="sets-wrapper">
          <Set v-for="(set) in items.sets" :set="set" :key="set.id" />
        </div>
        
        <div class="items-title">Инструменты</div>
        <div class="items-groups">
          <div class="item-group-wrapper" v-for="(toolGroup) in grouppedTools" :key="toolGroup.name">
            <div class="item-group-title">{{ toolGroup.name }}</div>
            <div class="item-group-items">
              <Item v-for="(tool) in toolGroup.items" :item="tool" :key="tool.id" />
            </div>
          </div>
        </div>

      </div>

      <div class="tab-content" :class="{active: (2 == activeTab)}">
        <div class="items-groups">
          <div class="item-group-wrapper" v-for="(group) in grouppedWeapons" :key="group.name">
            <div class="item-group-title">{{ group.name }}</div>
            <div class="item-group-items">
              <Weapon v-for="(weapon) in group.items" :weapon="weapon" :key="weapon.id" />
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" :class="{active: (3 == activeTab)}">
        <div class="items-groups">
          <div class="item-group-wrapper" v-for="(group) in grouppedArmor" :key="group.name">
            <div class="item-group-title">{{ group.name }}</div>
            <div class="item-group-items">
              <Armor v-for="(armor) in group.items" :armor="armor" :key="armor.id" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Item from './Item.vue';
import Set from './Set.vue';
import Weapon from './Weapon.vue';
import Armor from './Armor.vue';

export default {
  props: {
    items: Object,
    weapons: Array,
    armor: Array,
  },
  data(){
    return {
      activeTab: 1,
    };
  },
  computed: {
    grouppedItems() {
      return this.groupLists(this.items.items);
    },
    grouppedTools() {
      return this.groupLists(this.items.tool);
    },
    grouppedWeapons() {
      return this.groupLists(this.weapons);
    },
    grouppedArmor() {
      return this.groupLists(this.armor);
    },
  },
  methods: {
    switchTab(e) {
      let elem = e.target;
      this.activeTab = elem.getAttribute('data-tab-id');
    },
    groupLists(list) {
      let res = {};

      if (list != undefined) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];

          if (res[item.group] == undefined) {
            res[item.group] = {
              name: item.group,
              items: []
            };
          }
          
          res[item.group].items.push(item);
        }
      }

      return res;
    }
  },
  components: {
    Item,
    Set,
    Weapon,
    Armor
  }
}
</script>

<style lang="scss">
@import './../../scss/_variables.scss';

.items-tab-wrapper {
  .tab-content {
    padding: 10px;
  }
  .items-title {
    font-size: 1.2em;
    font-weight: bold;
    margin: 20px 0 10px;
  }

  .item-group-wrapper {
    padding: 20px 10px;
    margin: 10px 0 20px;
    border-radius: 10px;
    border: 2px solid $lightblue
  }
  .item-group-title {
    padding: 10px 5px;
    font-size: 1.2em;
  }
}
</style>
