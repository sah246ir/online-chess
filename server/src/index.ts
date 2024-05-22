import { WebSocket } from 'ws';
import { gameManager } from './gameManager';
import { ChessSquare } from 'chess-kit';

const wss = new WebSocket.Server({ port: 8080 });
console.log("websocket listening on ws:/localhost:8080");

export interface Move {
  code: string;
  from: ChessSquare;
  to: ChessSquare;
}

export interface Init {
  code: string;
  color: "white" | "black";
}

export interface Resign {
  code: string;
  player: "white" | "black";
}

export interface Draw {
  code: string;
  player: "white" | "black";
  type:"offer"|"accept"|"decline"
}

export interface Join {
  code: string;
}

interface Message {
  type: 'INIT' | 'JOIN' | 'MOVE' | 'RESIGN' | 'DRAW';
  content: Init | Move | Resign | Draw;
}

const Manager = new gameManager();

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    let data = JSON.parse(message.toString()) as Message;
    switch (data.type) {
      case 'INIT':
        Manager.initializeGame(data.content as Init, ws);
        break 
      case 'MOVE':
        Manager.makeMove(data.content as Move );
        break
      case 'DRAW': 
        let rdata = data.content as Draw
        if(rdata.type==="offer"){
          Manager.OfferDraw(rdata) 
        }else{
          Manager.handleDraw(rdata)
        }
        break
      case 'RESIGN':
        Manager.handleResign(data.content as Resign );
        break
    }
  });

  ws.on('close', () => {
    Manager.leaveGame(ws)
    console.log('Client disconnected');
  });
});
