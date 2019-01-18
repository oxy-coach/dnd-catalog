const Dexie = require('dexie').default;

module.exports = class SpellsDb {

  constructor (dbName) {

    this.dexie = new Dexie(dbName);
    this.dexie.version(1).stores({
      class: 'id,name',
      spell: 'id,name,level,castTime,distance,isRitual,isVerbal,isSomatic,isMaterial,materials,duration,hasConcentration,description',
      classSpells: 'id,classId,spellId'
    });

    this.dexie.open();
    console.log('constructed');
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

        console.log('dexie input ready');
      }).catch(err => {
        console.error("Dexie spawn error: " + err.stack);
      });

      resolve();
    });
  }
}