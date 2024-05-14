"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessFrontend = void 0;
const Chess_1 = require("./Chess");
const piecemoves_1 = require("./piecemoves");
const utils_1 = require("./utils");
const initialboard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w";
class ChessFrontend extends Chess_1.ChessGame {
    constructor(fenstring) {
        super();
        this.postMoveTasks = (piececolor) => {
            this.unsetSelected();
            this.unhighlightMoves();
            let opposition = piececolor === "black" ? "white" : "black";
            let check = this.checkKingThreat(opposition, this.board);
            if (check) {
                let [x, y] = (0, utils_1.parseNotation)(check);
                this.board[x][y].highlight = true;
            }
            if (check && this.isMate(opposition))
                this.updateResult(piececolor);
            return;
        };
        this.highlightMoves = (notation, board) => {
            let [m, n] = (0, utils_1.parseNotation)(notation);
            let cell = board[m][n];
            if (!this.selected)
                return;
            if (this.color && this.color !== this.turn)
                return;
            let piece = cell.piece;
            let [x, y] = (0, utils_1.parseNotation)(cell.square);
            let moves = piecemoves_1.chessPiecesMoves[piece.name](cell.square, piece.color, board);
            moves = moves.filter((notation) => {
                let [i, j] = (0, utils_1.parseNotation)(notation);
                let tmp = this.copyBoard();
                tmp[i][j].piece = tmp[x][y].piece;
                tmp[x][y].piece = null;
                let c = !this.checkKingThreat(piece.color, tmp);
                return c;
            });
            moves.forEach((notation) => {
                let [mi, mj] = (0, utils_1.parseNotation)(notation);
                this.board[mi][mj].highlight = true;
            });
            this.highlighted = moves;
        };
        this.unhighlightMoves = () => {
            this.highlighted.forEach((notation) => {
                let [mi, mj] = (0, utils_1.parseNotation)(notation);
                this.board[mi][mj].highlight = false;
            });
            this.highlighted = [];
        };
        this.board = [];
        this.highlighted = [];
        this.selected = "";
        this.createBoard(fenstring);
    }
    createBoard(fen) {
        if (!fen) {
            fen = initialboard;
        }
        const [fenboard, turn] = fen.split(" ");
        const rows = fenboard.split("/");
        const Board = [];
        for (let row = 0; row < rows.length; row++) {
            const boardRow = this.createBoardRow(rows[row], row);
            const frontendrow = boardRow.map(el => {
                return {
                    ...el,
                    selected: false,
                    highlight: false
                };
            });
            Board.push(frontendrow);
        }
        this.board = Board;
        this.turn = turn === "w" ? "white" : "black";
        this.postMoveTasks("white");
        this.postMoveTasks("black");
    }
    setSelected(notation) {
        if (this.color && this.color !== this.turn)
            return;
        this.selected = notation;
        let [i, j] = (0, utils_1.parseNotation)(notation);
        this.board[i][j].highlight = true;
        this.board[i][j].selected = true;
    }
    unsetSelected() {
        if (!this.selected)
            return;
        const [i, j] = (0, utils_1.parseNotation)(this.selected);
        this.board[i][j].highlight = false;
        this.board[i][j].selected = false;
        this.selected = "";
    }
}
exports.ChessFrontend = ChessFrontend;
