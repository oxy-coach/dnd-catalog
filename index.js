var express = require('express');
var http = require('http');
var server = http.createServer(express());
var io = require('socket.io')(server);

var dndBase = require('./server/src/classes/DndBase');

var config = require('./server/src/config.json');

// обработка запросов
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

// starting backend server
server.listen(config.port, () => console.log(`Backend listening on localhost:${config.port}`));


// обычный сервер (статика) на порту 8080
var frontApp = express();
frontApp.use(express.static('./client/dist'));
let port = '80';
frontApp.listen(port, () => console.log('Frontend listening on localhost:' + port));
