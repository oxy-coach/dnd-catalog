import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: false,
  },
  mutations: {
    initDb(state, payload) {
      state.db = payload;
    }
  },
  actions: {
  },
  modules: {
  }
});