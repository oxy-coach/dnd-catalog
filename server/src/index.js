var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var dndBase = require('./classes/DndBase');

var config = require('./config.json');

io.on('connection', function (socket) {

  // запрос базы данных
  socket.on('db request', function () {

    let db = new dndBase(config.db);

    // получаем промис с таблицами
    db.getTables(['spell', 'class', 'classSpells'])
    .then((response) => {
      db.close();

      // отдаем базу данных 
      io.emit('db response', {
        db: response
      });
    });

  });
});

// starting server
server.listen(config.port, () => console.log(`Listening on localhost:${config.port}`));
