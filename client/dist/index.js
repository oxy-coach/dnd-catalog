var http = require('http');
var Static = require('node-static');

// обычный сервер (статика) на порту 8080
var fileServer = new Static.Server('./dist');
http.createServer(function (req, res) {

  fileServer.serve(req, res);

}).listen(process.env.PORT || 8080);