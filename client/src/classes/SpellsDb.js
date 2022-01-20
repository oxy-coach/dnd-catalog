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
    this.dexie.version(2).stores({
      spell: 'id,name,level,castTime,distance,isRitual,isVerbal,isSomatic,isMaterial,materials,duration,hasConcentration,description,school'
    }).upgrade(tx => {
      return tx.spell.toCollection().modify((spell) => {
        // добавление строки
        spell.school = '';
      });
    });
    // 3-я версия - добавлены предметы, наборы, доспехи, оружие, инструменты
    this.dexie.version(3).stores({
      armor: 'id,group,name,price,ac,weight,strength,stealth',
      item: 'id,group,name,price,weight',
      tool: 'id,group,name,price,weight',
      weapon: 'id,group,name,price,damage,weight,properties',
      sets: 'id,name,price,description',
    });

    // 4-я версия - добавлен список заклинаний на печать
    this.dexie.version(4).stores({
      printSpells: '++id,spellId'
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

        yield dexieDb.armor.clear();

        yield dexieDb.item.clear();

        yield dexieDb.tool.clear();

        yield dexieDb.weapon.clear();

        yield dexieDb.sets.clear();

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
        if (!classCount) {
          console.log('no rows in class');
          yield dexieDb.class.bulkPut(db.class);
        }

        let spellCount = yield dexieDb.spell.count();
        if (!spellCount) {
          console.log('no rows in spell');
          yield dexieDb.spell.bulkPut(db.spell);
        }

        let csCount = yield dexieDb.classSpells.count();
        if (!csCount) {
          console.log('no rows in classSpells');
          yield dexieDb.classSpells.bulkPut(db.classSpells);
        }

        let armorCount = yield dexieDb.armor.count();
        if (!armorCount) {
          console.log('no rows in armor');
          yield dexieDb.armor.bulkPut(db.armor);
        }

        let itemCount = yield dexieDb.item.count();
        if (!itemCount) {
          console.log('no rows in item');
          yield dexieDb.item.bulkPut(db.item);
        }

        let toolCount = yield dexieDb.tool.count();
        if (!toolCount) {
          console.log('no rows in tool');
          yield dexieDb.tool.bulkPut(db.tool);
        }

        let weaponCount = yield dexieDb.weapon.count();
        if (!weaponCount) {
          console.log('no rows in weapon');
          yield dexieDb.weapon.bulkPut(db.weapon);
        }

        let setsCount = yield dexieDb.sets.count();
        if (!setsCount) {
          console.log('no rows in sets');
          yield dexieDb.sets.bulkPut(db.sets);
        }
        
        resolve();

      }).catch(err => {
        console.error("Dexie spawn error: " + err.stack);
      });

      
    });
  }
}