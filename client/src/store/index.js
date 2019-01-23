import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: false,
    favorites: {
      classes: [],
      spells: [],
    },
  },
  mutations: {
    initDb(state, payload) {
      state.db = payload;
    },
    initFavorites(state, payload) {
      state.favorites = payload;
    },
    classes(state, payload) {
      state.favorites.classes = payload;
    },
    spells(state, payload) {
      state.favorites.spells = payload;
    }
  },
  actions: {
    init({commit}, db){
      return new Promise((resolve, reject) => {
        commit('initDb', db);
        let favorites = {
          spells: [],
          classes: [],
        };

        let spells = [];
        let dexie = db.dexie;
        dexie.favoriteSpells.toCollection().toArray((result) => {
          spells = result.map(i => i.spellId);
          return dexie.spell.where('id').anyOf(spells).sortBy('level');
        })
        .then((result) => {
          spells = result;
          return dexie.favoriteClass.toCollection().toArray();
        })
        .then((res) => {
          let classes = res.map(i => i.classId);
          return dexie.class.where('id').anyOf(classes).toArray();
        })
        .then((classes) => {
          favorites = {
            spells: spells,
            classes: classes
          };
          commit('initFavorites', favorites);
          resolve();
        }).catch((e) => {
          reject(e);
        });
      });
    },
    // добавить класс
    addClass({commit, state}, id){
      return new Promise((resolve, reject) => {
        let db = state.db.dexie;
        db.favoriteClass.put({ classId: id }).then(() => {
          return db.favoriteClass.toCollection().toArray()
        }).then((result) => {
          return db.class.where('id').anyOf(result.map(i => i.classId)).toArray();
        }).then((result) => {
          commit('classes', result);
          resolve();
        }).catch(e => reject(e));
      });
    },
    // удалить класс
    removeClass({commit, state}, id){
      return new Promise((resolve, reject) => {
        let db = state.db.dexie;
        db.favoriteClass.where({ classId: id }).delete().then(() => {
          return db.favoriteClass.toCollection().toArray()
        }).then((result) => {
          return db.class.where('id').anyOf(result.map(i => i.classId)).toArray();
        }).then((result) => {
          commit('classes', result);
          resolve();
        }).catch(e => reject(e));
      });
    },
    // добавить заклинание
    addSpell({commit, state}, id) {
      return new Promise((resolve, reject) => {
        let db = state.db.dexie;
        db.favoriteSpells.put({ spellId: id }).then(() => {
          return db.favoriteSpells.toCollection().toArray()
        }).then((result) => {
          let spells = result.map(i => i.spellId);
          return db.spell.where('id').anyOf(spells).sortBy('level');
        }).then((result) => {
          commit('spells', result);
          resolve();
        }).catch(e => reject(e));
      });
    },
    // удалить заклинание
    removeSpell({commit, state}, id) {
      return new Promise((resolve, reject) => {
        let db = state.db.dexie;
        db.favoriteSpells.where({ spellId: id}).delete().then(() => {
          return db.favoriteSpells.toCollection().toArray()
        }).then((result) => {
          let spells = result.map(i => i.spellId);
          return db.spell.where('id').anyOf(spells).sortBy('level');
        }).then((result) => {
          commit('spells', result);
          resolve();
        }).catch(e => reject(e));
      });
    },
  },
  modules: {
  }
});