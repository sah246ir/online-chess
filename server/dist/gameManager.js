"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = void 0;
const Chess_1 = require("./ChessLogic/Chess");
class gameManager {
    constructor() {
        this.games = [];
    }
    initializeGame(data, ws) {
        let gameIndex = this.games.findIndex((el) => {
            return el.gameid === data.code;
        });
        if (gameIndex > -1) {
            return this.joinGame(gameIndex, ws);
        }
        let game = {
            board: new Chess_1.ChessGame(),
            moves: [],
            gameid: data.code,
            white: data.color === "white" ? ws : null,
            black: data.color === "black" ? ws : null,
        };
        this.games.push(game);
    }
    joinGame(idx, ws) {
        if (!this.games[idx].black) {
            this.games[idx].black = ws;
            this.games[idx].black?.send(JSON.stringify({
                type: "MOVE",
                board: this.games[idx].board.parseBoard()
            }));
        }
        else if (!this.games[idx].white) {
            this.games[idx].white = ws;
            this.games[idx].white?.send(JSON.stringify({
                type: "MOVE",
                board: this.games[idx].board.parseBoard()
            }));
        }
        this.games[idx].black?.send(JSON.stringify({
            type: "START",
            color: "black"
        }));
        this.games[idx].white?.send(JSON.stringify({
            type: "START",
            color: "white"
        }));
        return;
    }
    leaveGame(ws) {
        let black = this.games.findIndex((el) => {
            return el.black === ws;
        });
        let white = this.games.findIndex((el) => {
            return el.white === ws;
        });
        if (black > -1) {
            this.games[black].black = null;
        }
        if (white > -1) {
            this.games[white].white = null;
        }
    }
    makeMove(data) {
        let gameIndex = this.games.findIndex((el) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1)
            return;
        let game = this.games[gameIndex];
        console.log(data);
        game.board.makeMove(data.from, data.to);
        let move = {
            type: "MOVE",
            board: game.board.parseBoard()
        };
        if (game) {
            if (game.moves.length % 2 == 0) {
                game.black?.send(JSON.stringify(move));
            }
            else {
                game.white?.send(JSON.stringify(move));
            }
            game.moves.push(data.from + " " + data.to);
        }
    }
    OfferDraw(data) {
        let gameIndex = this.games.findIndex((el) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1)
            return;
        let game = this.games[gameIndex];
        let senddata = {
            type: "DRAW",
            content: {
                type: "offer",
                player: data.player
            }
        };
        if (data.player === "white") {
            game.black?.send(JSON.stringify(senddata));
        }
        else {
            game.white?.send(JSON.stringify(senddata));
        }
    }
    handleDraw(data) {
        let gameIndex = this.games.findIndex((el) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1)
            return;
        let game = this.games[gameIndex];
        let senddata = {
            type: "DRAW",
            content: {
                type: data.type,
                player: data.player
            }
        };
        if (data.player === "white") {
            game.black?.send(JSON.stringify(senddata));
        }
        else {
            game.white?.send(JSON.stringify(senddata));
        }
    }
    handleResign(data) {
        let gameIndex = this.games.findIndex((el) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1)
            return;
        let game = this.games[gameIndex];
        let senddata = {
            type: "RESIGN",
            content: {
                player: data.player
            }
        };
        if (data.player === "white") {
            game.black?.send(JSON.stringify(senddata));
        }
        else {
            game.white?.send(JSON.stringify(senddata));
        }
    }
}
exports.gameManager = gameManager;
