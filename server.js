const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  