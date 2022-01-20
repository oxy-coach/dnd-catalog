<template>
  <div class="printable-wrapper">
    <div class="printable-spells" v-if="!emptySpells">
      <div class="printable-title">Заклинания на печать:</div>
      <button class="printable-btn" @click="print">Просмотр печати</button>
      <div class="printable-lists" id="print-list">
          
            <PrintSpell v-for="(spell) in getPrints.spells" :item="spell" :key="spell.id" />
          
      </div>
    </div>
    <div class="empty-message" v-if="emptySpells">В вашем списке на печать пусто</div>
  </div>
</template>

<script>
import PrintSpell from './PrintSpell.vue';

export default {
  data() {
    return {
    };
  },
  computed: {
    getDb() {
      return this.$store.state.db;
    },
    getPrints() {
      return this.$store.state.prints;
    },
    emptySpells() {
      return !Boolean(this.getPrints.spells.length);
    }
  },
  methods: {
    async print() {
      await this.$htmlToPaper('print-list');
    }
  },
  mounted() {
  },
  components: {
    PrintSpell
  }
}
</script>

<style lang="scss">
  .printable-title {
    font-weight: bold;
    padding: 5px 10px;
  }
  .empty-message {
    font-weight: bold;
    font-style: italic;
    padding: 5px 10px;
  }
  .printable-btn {
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
    cursor: pointer;
    margin: 10px;
  }
  .printable-lists {
    width: 21cm;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 5mm 9mm;
    border-radius: 10px;
    margin: 5mm auto;
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
  }
</style>

