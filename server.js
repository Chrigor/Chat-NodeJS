const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app); // config http
const io = require("socket.io")(server); // config websocket

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));

app.engine('html', require("ejs").renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
  console.log(`Socket conectado: ${socket.id}`);

  socket.on('sendMessage', dados => {
      messages.push(dados);
      socket.broadcast.emit('recevedMessage', dados);
  }); 
})

server.listen(3000);