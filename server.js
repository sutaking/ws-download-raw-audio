const WebSocket = require('ws');
const fs = require('fs');

//const pcm_file = './test.wav';
let interval = 0,
    sampleRate = 48000,//8000,
    bytePerSample = 2,
    channels = 2,
    bytesChunk = (sampleRate * bytePerSample * channels),
    offset = 0,
    pcmData,
    wss;

/*fs.readFile(pcm_file, (err, data) => {
    if (err) throw err;
    pcmData = data;
    openSocket();
});*/
openSocket();

function openSocket() {
  wss = new WebSocket.Server({ port: 5000 });
  console.log(`[${new Date()}] Server 5000 ready...`);

  wss.on('connection', function connection(ws) {
        console.log(`[${new Date()}] Socket connected. Listsen data...`);
        ws.on('message', function incoming(data) {
                console.log(`[${new Date()}] Download file, len: ${data.length}`);
                let name = `ws-${Date.now()}.wav`;
                fs.writeFile(`./${name}`, data, (err) => {
                    //console.log(err);
                })
        });
  });

  
}

/*function sendData() {
    let payload;
    if (offset >= pcmData.length) {
       clearInterval(interval);
       offset = 0;
       return;
    }
    
    payload = pcmData.subarray(offset, (offset + bytesChunk));
    offset += bytesChunk;
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
      }
    });
}*/