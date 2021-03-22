const app = require('express')();
// http server usually created automatically by express when just using "app"
// we need access to the http server to pass into socket.io so we are explicitly creating the http server
// the express app object is then passed into the http server function
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 80;

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
})

app.get('/style.css', (req, res)=>{
  res.sendFile(__dirname + '/style.css');
})

io.on('connection', (socket)=>{
  console.log('a user connected');
  socket.on('disconnect', ()=>{
    console.log('a user disconnected');
  })
  socket.on('chat message', (msg)=>{
    console.log(msg);
    io.emit('chat message', msg);
  })
})

http.listen(PORT, '0.0.0.0', ()=>{
  console.log('listening on port ' + PORT);
})
