import { Init, Move, Draw, Resign, Message } from "./index";
import { WebSocket } from 'ws';
import { Chess } from "chess-kit";
import { ChessSquare } from "chess-kit";
interface Game {
    board: Chess
    white: WebSocket | null;
    black: WebSocket | null; 
    gameid: String;
    moves: {
        from:ChessSquare,
        to:ChessSquare
    }[]
}
export class gameManager {
    private games: Game[]
    constructor() {
        this.games = []
    }

    initializeGame(data: Init, ws: WebSocket) {
        let gameIndex: number = this.games.findIndex((el: Game) => {
            return el.gameid === data.code;
        });
        if (gameIndex > -1) {
            return this.joinGame(gameIndex, ws)
        }
        let game = {
            board: new Chess(),
            moves: [],
            gameid: data.code,
            white: data.color === "white" ? ws : null,
            black: data.color === "black" ? ws : null,
        }
        this.games.push(game)
    }

    private joinGame(idx: number, ws: WebSocket) {
        if (!this.games[idx].black) {
            this.games[idx].black = ws; 
        } else if (!this.games[idx].white) {
            this.games[idx].white = ws; 
        }
        this.games[idx].black?.send(JSON.stringify({
            type: "START",
            color: "black",
            board: this.games[idx].board.encodeBoard(),
            captures:this.games[idx].board.captured,
            moves:this.games[idx].moves
        }))
        this.games[idx].white?.send(JSON.stringify({
            type: "START",
            color: "white",
            board: this.games[idx].board.encodeBoard(),
            captures:this.games[idx].board.captured,
            moves:this.games[idx].moves
        }))
        return
    }

    leaveGame(ws: WebSocket) {
        let black: number = this.games.findIndex((el: Game) => {
            return el.black === ws;
        });
        let white: number = this.games.findIndex((el: Game) => {
            return el.white === ws;
        });
        if (black > -1) {
            this.games[black].black = null;
        }
        if (white > -1) {
            this.games[white].white = null;
        }
    }

    makeMove(data: Move) {
        let gameIndex: number = this.games.findIndex((el: Game) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1) return
        let game = this.games[gameIndex] 
        let movemade = game.board.makeMove(data.from as ChessSquare, data.to as ChessSquare)
        let move = {
            type: "MOVE",
            board: game.board.encodeBoard(),
            captures:game.board.captured,
            move:{
                from:data.from,
                to:data.to,
            }
        }
        if (game && movemade) {
            if (game.board.turn === "black") {
                game.black?.send(JSON.stringify(move))
            } else {
                game.white?.send(JSON.stringify(move))
            } 
            this.games[gameIndex].moves.push({
                from:data.from ,
                to:data.to 
            })
        }
    }

    OfferDraw(data: Draw) {
        let gameIndex: number = this.games.findIndex((el: Game) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1) return
        let game = this.games[gameIndex]
        let senddata = {
            type: "DRAW",
            content: {
                type: "offer",
                player: data.player
            }
        }
        if (data.player === "white") {
            game.black?.send(JSON.stringify(senddata))
        } else {
            game.white?.send(JSON.stringify(senddata))
        }
    }

    handleDraw(data: Draw) {
        let gameIndex: number = this.games.findIndex((el: Game) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1) return
        let game = this.games[gameIndex]
        let senddata = {
            type: "DRAW",
            content: {
                type: data.type,
                player: data.player
            }
        }
        if (data.player === "white") {
            game.black?.send(JSON.stringify(senddata))
        } else {
            game.white?.send(JSON.stringify(senddata))
        }
    }

    handleResign(data: Resign) {
        let gameIndex: number = this.games.findIndex((el: Game) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1) return
        let game = this.games[gameIndex]
        let senddata = {
            type: "RESIGN",
            content: {
                player: data.player
            }
        }
        if (data.player === "white") {
            game.black?.send(JSON.stringify(senddata))
        } else {
            game.white?.send(JSON.stringify(senddata))
        }
    }

    sendMessage(data:Message){
        let gameIndex: number = this.games.findIndex((el: Game) => {
            return el.gameid === data.code;
        });
        if (gameIndex === -1) return
        let game = this.games[gameIndex]
        let senddata = {
            type:"MESSAGE",
            content:{
                from:data.from,
                message:data.message
            }
        }
        game.white?.send(JSON.stringify(senddata))
        game.black?.send(JSON.stringify(senddata))
    }

}