const sqlite3 = require('sqlite3').verbose();

/**
 * Класс для базы данных
 */
module.exports = class DndBase {
  constructor(dbPath) {

    // объект базы данных
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the SQlite database.');
    });

  }

  /**
   * Получить список строк таблиц
   * @param {*} tableNames 
   */
  getTables(tableNames) {
    return ( async (tableNames) => {
      let result = {};
      for (let i = 0; i < tableNames.length; i++) {
        let tableName = tableNames[i];
        await this.getTableRows(tableName)
          .then((response) => {
            result[tableName] = response;
          });
      }
      return result;
    })(tableNames);
  }

  /**
   * Получить строки из таблицы
   * @param {*} tableName 
   */
  getTableRows(tableName) {
    return new Promise((resolve) => {
      this.db.all('SELECT * FROM ' + tableName, [], (err, rows) => {
        if (err) console.log(err);
        resolve(rows);
      });
    });
  }
  
  /**
   * Закрытие БД
   */
  close() {
    return this.db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
}