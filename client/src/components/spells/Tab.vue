<template>
  <div class="tabs-wrapper">
    <div class="tabs-header">
      <div class="tab-link" :class="{active: (1 == activeTab)}" data-tab-id="1" @click="switchTab">По классам</div>
      <div class="tab-link" :class="{active: (2 == activeTab)}" data-tab-id="2" @click="switchTab">Избранное</div>
      <div class="tab-link" :class="{active: (3 == activeTab)}" data-tab-id="3" @click="switchTab">Печать</div>
      <div class="tab-link" :class="{active: (4 == activeTab)}" data-tab-id="4" @click="switchTab">Поиск</div>
    </div>
    <div class="tabs-content-wrapper">
      <div class="tab-content" :class="{active: (1 == activeTab)}">
        <div class="tab-title">Заклинания по классам:</div>
        <Class v-for="(classItem) in getClassList" :classItem="classItem" :key="classItem.id" />
      </div>
      <div class="tab-content" :class="{active: (2 == activeTab)}">
        <Favorites />
      </div>
       <div class="tab-content" :class="{active: (3 == activeTab)}">
        <Prints />
      </div>
      <div class="tab-content" :class="{active: (4 == activeTab)}">
        <Search />
      </div>
    </div>
  </div>
</template>

<script>
import Class from './Class.vue';
import Favorites from './Favorites.vue';
import Prints from './Prints.vue';
import Search from './Search.vue';


export default {
  data(){
    return {
      activeTab: 1,
    };
  },
  computed: {
    getDb() {
      return this.$store.state.db;
    },
    getClassList() {
      return this.$store.state.classList;
    },
  },
  methods: {
    switchTab(e) {
      let elem = e.target;
      this.activeTab = elem.getAttribute('data-tab-id');
    },
  },
  mounted(){
  },
  components: {
    Class,
    Favorites,
    Prints,
    Search
  }
}
</script>

<style lang="scss">
  @import './../../scss/tab.scss';

</style>

