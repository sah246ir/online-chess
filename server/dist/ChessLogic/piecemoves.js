"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chessPiecesMoves = exports.getPawnMoves = exports.getKingMoves = exports.getQueenMoves = exports.getBishopMoves = exports.getKnightMoves = exports.getRookMoves = void 0;
// import { CellType,ChessSquare,parseNotation } from "./chessgame" 
const utils_1 = require("./utils");
const getRookMoves = (notation, color, board) => {
    let [i, j] = (0, utils_1.parseNotation)(notation);
    let moves = [];
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];
    for (const [dx, dy] of directions) {
        let x = i + dx;
        let y = j + dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (!processCell(board[x][y].square, color, board, moves)) {
                break;
            }
            x += dx;
            y += dy;
        }
    }
    return moves;
};
exports.getRookMoves = getRookMoves;
const getKnightMoves = (notation, color, board) => {
    let [i, j] = (0, utils_1.parseNotation)(notation);
    let moves = [];
    const directions = [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2]
    ];
    for (const [dx, dy] of directions) {
        const x = i + dx;
        const y = j + dy;
        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
            continue;
        }
        processCell(board[x][y].square, color, board, moves);
    }
    return moves;
};
exports.getKnightMoves = getKnightMoves;
const getBishopMoves = (notation, color, board) => {
    let [i, j] = (0, utils_1.parseNotation)(notation);
    let moves = [];
    const directions = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1] // bottom-right
    ];
    for (const [dx, dy] of directions) {
        let x = i + dx;
        let y = j + dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (!processCell(board[x][y].square, color, board, moves)) {
                break;
            }
            x += dx;
            y += dy;
        }
    }
    return moves;
};
exports.getBishopMoves = getBishopMoves;
const getQueenMoves = (notation, color, board) => {
    return [
        ...(0, exports.getBishopMoves)(notation, color, board),
        ...(0, exports.getRookMoves)(notation, color, board),
    ];
};
exports.getQueenMoves = getQueenMoves;
const getKingMoves = (notation, color, board) => {
    let [i, j] = (0, utils_1.parseNotation)(notation);
    let moves = [];
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1] // bottom-right
    ];
    for (const [dx, dy] of directions) {
        const x = i + dx;
        const y = j + dy;
        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
            continue;
        }
        processCell(board[x][y].square, color, board, moves);
    }
    return moves;
};
exports.getKingMoves = getKingMoves;
const getPawnMoves = (notation, color, board) => {
    let [i, j] = (0, utils_1.parseNotation)(notation);
    let moves = [];
    const direction = (color === 'white') ? -1 : 1; // Direction of pawn movement based on color
    // Normal pawn move
    if (board[i + direction][j].piece === null) {
        let tcell = board[i + direction][j].square;
        moves.push(tcell);
        if ((color === 'white' && i === 6) || (color === 'black' && i === 1)) {
            if (board[i + 2 * direction][j].piece === null) {
                let cell = board[i + 2 * direction][j].square;
                moves.push(cell);
            }
        }
    }
    // Pawn captures
    const piece = board[i + direction][j - 1] ? board[i + direction][j - 1].piece : null;
    if (j > 0 && piece && piece.color !== color) {
        let cell = board[i + direction][j - 1].square;
        moves.push(cell);
    }
    const piece2 = board[i + direction][j + 1] ? board[i + direction][j + 1].piece : null;
    if (j < 7 && piece2 && piece2.color !== color) {
        let cell = board[i + direction][j + 1].square;
        moves.push(cell);
    }
    return moves;
};
exports.getPawnMoves = getPawnMoves;
exports.chessPiecesMoves = {
    'rook': exports.getRookMoves,
    'knight': exports.getKnightMoves,
    'bishop': exports.getBishopMoves,
    'queen': exports.getQueenMoves,
    'king': exports.getKingMoves,
    'pawn': exports.getPawnMoves
};
function processCell(notation, color, board, moves) {
    let [i, j] = (0, utils_1.parseNotation)(notation);
    if (i < 0 || i >= 8 || j < 0 || j >= 8) {
        return false;
    }
    const piece = board[i][j].piece;
    if (piece !== null && piece.color === color) {
        return false;
    }
    moves.push(notation);
    return !piece;
}
