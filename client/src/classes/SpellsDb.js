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

  updateDb(db) {
    return new Promise((resolve) => {

      let dexieDb = this.dexie;

      Dexie.spawn(function* () {

        yield dexieDb.class.count((count) => {
          if (!count) {
            console.log('no rows in class');
            dexieDb.class.bulkPut(db.class);
          }
        });

        yield dexieDb.spell.count((count) => {
          if (!count) {
            console.log('no rows in spell');
            dexieDb.spell.bulkPut(db.spell);
          }
        });

        yield dexieDb.classSpells.count((count) => {
          if (!count) {
            console.log('no rows in classSpells');
            dexieDb.classSpells.bulkPut(db.classSpells);
          }
        });
        
      }).catch(err => {
        console.error("Dexie spawn error: " + err.stack);
      });

      resolve();
    });
  }
}