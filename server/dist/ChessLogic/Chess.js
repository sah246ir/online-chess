"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessGame = void 0;
const utils_1 = require("./utils");
const chessTypes_1 = require("./chessTypes");
const piecemoves_1 = require("./piecemoves");
var Pieces = "RNBQKBNR";
var colors = ["white", "black"];
const initialboard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w";
class ChessGame {
    constructor(fenstring) {
        this.postMoveTasks = (piececolor) => {
            let opposition = piececolor === "black" ? "white" : "black";
            let check = this.checkKingThreat(opposition, this.board);
            if (check.length > 0 && this.isMate(opposition))
                return this.updateResult(this.turn);
            if (check.length > 0)
                this.check = check;
            return;
        };
        this.board = [];
        this.check = "";
        this.turn = "white";
        this.captured = [];
        this.color = null;
        this.winner = null;
        this.createBoard(fenstring);
    }
    createBoard(fen) {
        if (!fen)
            fen = initialboard;
        const [fenboard, turn] = fen.split(" ");
        const rows = fenboard.split("/");
        const Board = [];
        for (let row = 0; row < rows.length; row++) {
            const boardRow = this.createBoardRow(rows[row], row);
            Board.push(boardRow);
        }
        this.turn = turn === "w" ? "white" : "black";
        this.board = Board;
    }
    parseBoard() {
        let string = "";
        for (let row of this.board) {
            let empty_places = 0;
            for (let col of row) {
                if (col.piece) {
                    if (empty_places > 0) {
                        string += empty_places;
                        empty_places = 0;
                    }
                    string += chessTypes_1.fenChessCode[`${col.piece.name}-${col.piece.color}`];
                }
                else {
                    empty_places += 1;
                }
            }
            if (empty_places > 0) {
                string += empty_places;
                empty_places = 0;
            }
            string += '/';
        }
        string += this.turn === "black" ? " b" : " w";
        return string;
    }
    createBoardRow(cols, row) {
        const boardRow = [];
        let colnum = 0;
        for (let col = 0; col < cols.length; col++) {
            const value = cols[col];
            let color = colors[(row + colnum) % 2];
            if (isNaN(parseInt(value))) {
                boardRow.push({
                    piece: chessTypes_1.fenChessPieces[value],
                    cell_color: color,
                    square: `${String.fromCharCode(colnum + 97)}${8 - row}`
                });
                colnum += 1;
            }
            else {
                for (let empty = 0; empty < parseInt(value); empty++) {
                    let color = colors[(row + colnum) % 2];
                    boardRow.push({
                        piece: null,
                        cell_color: color,
                        square: `${String.fromCharCode((colnum) + 97)}${8 - row}`
                    });
                    colnum += 1;
                }
            }
        }
        return boardRow;
    }
    getCaptures(color) {
        const opponentColor = color === "white" ? "black" : "white";
        const colorCaptures = this.captured.filter(pc => pc.color === opponentColor);
        const colorPoints = colorCaptures.reduce((acc, pc) => acc + chessTypes_1.piecePoints[pc.name], 0);
        const opponentCaptures = this.captured.filter(pc => pc.color === color);
        const opponentPoints = opponentCaptures.reduce((acc, pc) => acc + chessTypes_1.piecePoints[pc.name], 0);
        return {
            captures: colorCaptures,
            points: colorPoints,
            lead: colorPoints - opponentPoints < 0 ? 0 : colorPoints - opponentPoints,
        };
    }
    updateResult(result) {
        this.winner = result;
    }
    getPieces(color, board) {
        let pos = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j].piece?.color === color) {
                    pos.push(board[i][j].square);
                }
            }
        }
        return pos;
    }
    toggleMove() {
        this.turn = this.turn === "white" ? "black" : "white";
    }
    validateMove(from, to) {
        let [x, y] = (0, utils_1.parseNotation)(from);
        let [i, j] = (0, utils_1.parseNotation)(to);
        let piece = this.board[x][y].piece;
        if (piece.color !== this.turn)
            throw new Error("UH OH! It's not your turn");
        let psbl_movies = piecemoves_1.chessPiecesMoves[piece.name](from, piece.color, this.board);
        if (psbl_movies.indexOf(to) === -1)
            throw new Error(`${piece.name} cannot make this move`);
        let testboard = this.copyBoard();
        testboard[i][j].piece = piece;
        testboard[x][y].piece = null;
        if (this.checkKingThreat(piece.color, testboard).length > 0)
            throw new Error(`The king is threatened`);
        return true;
    }
    makeMove(from, to) {
        let [x, y] = (0, utils_1.parseNotation)(from);
        let [i, j] = (0, utils_1.parseNotation)(to);
        let piece = this.board[x][y].piece;
        if (!piece)
            throw new Error('There is no piece present on ' + from);
        if (!this.validateMove(from, to))
            return false;
        let capture = this.board[i][j].piece;
        if (capture) {
            this.captured.push(capture);
        }
        this.board[i][j].piece = piece;
        this.board[x][y].piece = null;
        this.postMoveTasks(piece.color);
        this.toggleMove();
        console.log(this.parseBoard());
        return true;
    }
    copyBoard() {
        return JSON.parse(JSON.stringify(this.board));
    }
    checkKingThreat(color, board) {
        let threatees = this.getPieces(color === "black" ? "white" : "black", board);
        for (let threat of threatees) {
            let [i, j] = (0, utils_1.parseNotation)(threat);
            let piece = board[i][j].piece;
            let moves = piecemoves_1.chessPiecesMoves[piece.name](threat, piece.color, board);
            for (let move of moves) {
                let [x, y] = (0, utils_1.parseNotation)(move);
                let pc = board[x][y].piece;
                if (pc && pc.name === "king" && pc.color !== piece.color) {
                    return move;
                }
            }
        }
        return "";
    }
    isMate(color) {
        let turn_pieces = this.getPieces(color, this.board);
        for (let pos of turn_pieces) {
            let [x, y] = (0, utils_1.parseNotation)(pos);
            let pc = this.board[x][y].piece;
            if (!pc)
                continue;
            let moves = piecemoves_1.chessPiecesMoves[pc.name](this.board[x][y].square, pc.color, this.board);
            for (let notation of moves) {
                let [i, j] = (0, utils_1.parseNotation)(notation);
                let tmp = this.copyBoard();
                tmp[i][j].piece = tmp[x][y].piece;
                tmp[x][y].piece = null;
                if (!this.checkKingThreat(color, tmp)) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.ChessGame = ChessGame;
