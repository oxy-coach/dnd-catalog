import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: false,
    classList: [],
    favorites: {
      classes: [],
      spells: [],
    },
    prints: {
      spells: [],
    }
  },
  mutations: {
    initDb(state, payload) {
      state.db = payload;
    },
    initFavorites(state, payload) {
      state.favorites = payload;
    },
    initPrinted(state, payload) {
      state.prints = payload;
    },
    classList(state, payload) {
      state.classList = payload;
    },
    classes(state, payload) {
      state.favorites.classes = payload;
    },
    spells(state, payload) {
      state.favorites.spells = payload;
    },
    spellsPrints(state, payload) {
      state.prints.spells = payload;
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

        let prints = {
          spells: []
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

          return dexie.class.toCollection().toArray();
        })
        .then((classes) => {
          commit('classList', classes);
          
          return dexie.printSpells.toCollection().toArray();
        })
        .then((result) => {
          let prSpells = result.map(i => i.spellId);
          return dexie.spell.where('id').anyOf(prSpells).sortBy('level');
        })
        .then((result) => {
          prints.spells = result;
          commit('initPrinted', prints);

          resolve();
        }).catch((e) => {
          reject(e);
        });
      });
    },
    // обновление бд
    update({commit, state}){
      return new Promise((resolve, reject) => {
        let dexie = state.db.dexie;

        dexie.class.toCollection().toArray()
        .then((classes) => {
          console.log('classList go');
          commit('classList', classes);
          resolve();
        }).catch(e => reject(e));

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
    // добавить заклинание
    addSpellPrint({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        let db = state.db.dexie;
        db.printSpells.put({ spellId: id }).then(() => {
          return db.printSpells.toCollection().toArray()
        }).then((result) => {
          let spells = result.map(i => i.spellId);
          return db.spell.where('id').anyOf(spells).sortBy('level');
        }).then((result) => {
          commit('spellsPrints', result);
          resolve();
        }).catch(e => reject(e));
      });
    },
    // удалить заклинание
    removeSpellPrint({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        let db = state.db.dexie;
        db.printSpells.where({ spellId: id }).delete().then(() => {
          return db.printSpells.toCollection().toArray()
        }).then((result) => {
          let spells = result.map(i => i.spellId);
          return db.spell.where('id').anyOf(spells).sortBy('level');
        }).then((result) => {
          commit('spellsPrints', result);
          resolve();
        }).catch(e => reject(e));
      });
    },
  },
  modules: {
  }
});