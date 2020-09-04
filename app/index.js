
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const validate_regex = /^[\u4e00-\u9eff]{1,5}$/;

app.use(express.static(__dirname + '/pub'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('msg', function(msg){
    console.log("msg get:", msg);
    if(validate_regex.test(msg))
      socket.broadcast.emit('msg', msg + "　".repeat(5 - msg.length));
    else
      console.error("msg validation failed, rejected!");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});
