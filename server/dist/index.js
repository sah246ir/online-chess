"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const gameManager_1 = require("./gameManager");
const wss = new ws_1.WebSocket.Server({ port: 8080 });
console.log("websocket listening on ws:/localhost:8080");
const Manager = new gameManager_1.gameManager();
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        let data = JSON.parse(message.toString());
        switch (data.type) {
            case 'INIT':
                Manager.initializeGame(data.content, ws);
                break;
            case 'MOVE':
                Manager.makeMove(data.content);
                break;
            case 'DRAW':
                let rdata = data.content;
                if (rdata.type === "offer") {
                    Manager.OfferDraw(rdata);
                }
                else {
                    Manager.handleDraw(rdata);
                }
                break;
            case 'RESIGN':
                Manager.handleResign(data.content);
                break;
        }
    });
    ws.on('close', () => {
        Manager.leaveGame(ws);
        console.log('Client disconnected');
    });
});
