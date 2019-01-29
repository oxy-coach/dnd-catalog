var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var dndBase = require('./classes/DndBase');

var config = require('./config.json');
let db = new dndBase(config.db);

io.on('connection', function (socket) {

  

  // запрос базы данных
  socket.on('db request', function () {

    let db = new dndBase(config.db);

    // получаем промис с таблицами
    db.getTables(['spell', 'class', 'classSpells', 'armor', 'item', 'tool', 'weapon', 'sets'])
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
let port = process.env.PORT || 3031;
server.listen(port, () => console.log(`Listening on localhost:${port}`));
