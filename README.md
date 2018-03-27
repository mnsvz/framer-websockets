# TV + Remote Prototype (Websockets) - FramerJS
A step-by-step tutorial for easily prototyping interactive TV + remote prototypes in Framer.

![](https://github.com/mnsvz/framer-websockets/blob/master/cover.jpeg)


Websocket methods in Framer
```
ws.onmessage = (event) ->
 if event.data == "left"
  fe.changeFocus("left")
 else if event.data == "right"
  fe.changeFocus("right")
 else if event.data == "up"
  fe.changeFocus("up")
 else if event.data == "down"
  fe.changeFocus("down")
```

Websocket Server in Javascript
```
'use strict';
const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', function incoming(data) {
    console.log(wss.clients.size);
    console.log(data);
    wss.clients.forEach((client) => {
      client.send(data);
});
})
});

```

Prototypes
![](https://github.com/mnsvz/framer-websockets/blob/master/prototypes.gif)
