const Dexie = require('dexie').default;

module.exports = class SpellsDb {

  constructor (dbName) {
    this.dexie = new Dexie(dbName);
    this.dexie.version(1).stores({
      class: 'id,name,spellsInfo',
      spell: 'id,name,level,castTime,distance,isRitual,isVerbal,isSomatic,isMaterial,materials,duration,hasConcentration,description',
      classSpells: 'id,classId,spellId',
      favoriteClass: '++id,classId',
      favoriteSpells: '++id,spellId'
    });

    //this.loaded = this.checkLoad();

    this.dexie.open();
  }

  // проверка таблиц
  checkLoad(){
    return new Promise((resolve) => {
      let dexieDb = this.dexie;

      Dexie.spawn(function* () {

        let classCount = yield dexieDb.class.count();

        let spellCount = yield dexieDb.spell.count();

        let csCount = yield dexieDb.classSpells.count();

        resolve((classCount && spellCount && csCount));

      }).catch(err => {
        console.error("Dexie spawn error: " + err.stack);
      });

    });
  }

  // очистка таблиц 
  clearDb() {
    return new Promise((resolve) => {
      let dexieDb = this.dexie;

      Dexie.spawn(function* () {

        yield dexieDb.class.clear();

        yield dexieDb.spell.clear();

        yield dexieDb.classSpells.clear();

        resolve();

      }).catch(err => {
        console.error("Dexie spawn error: " + err.stack);
      });
    });
  }

  // обновление таблиц
  updateDb(db) {
    return new Promise((resolve) => {

      let dexieDb = this.dexie;

      Dexie.spawn(function* () {

        let classCount = yield dexieDb.class.count();

        let spellCount = yield dexieDb.spell.count();

        let csCount = yield dexieDb.classSpells.count();

        if (!classCount) {
          console.log('no rows in class');
          yield dexieDb.class.bulkPut(db.class);
        }

        if (!spellCount) {
          console.log('no rows in spell');
          yield dexieDb.spell.bulkPut(db.spell);
        }

        if (!csCount) {
          console.log('no rows in classSpells');
          yield dexieDb.classSpells.bulkPut(db.classSpells);
        }
        
        resolve();

      }).catch(err => {
        console.error("Dexie spawn error: " + err.stack);
      });

      
    });
  }
}