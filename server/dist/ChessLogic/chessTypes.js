"use strict";
// piecemoves.d.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.fenChessCode = exports.fenChessPieces = exports.piecePoints = exports.chessPieces = void 0;
exports.chessPieces = {
    'R': 'rook',
    'N': 'knight',
    'B': 'bishop',
    'Q': 'queen',
    'K': 'king',
    'P': 'pawn'
};
exports.piecePoints = {
    'rook': 5,
    'knight': 3,
    'bishop': 3,
    'queen': 8,
    'king': 0,
    'pawn': 1
};
exports.fenChessPieces = {
    'R': { name: 'rook', color: 'white' },
    'N': { name: 'knight', color: 'white' },
    'B': { name: 'bishop', color: 'white' },
    'Q': { name: 'queen', color: 'white' },
    'K': { name: 'king', color: 'white' },
    'P': { name: 'pawn', color: 'white' },
    'r': { name: 'rook', color: 'black' },
    'n': { name: 'knight', color: 'black' },
    'b': { name: 'bishop', color: 'black' },
    'q': { name: 'queen', color: 'black' },
    'k': { name: 'king', color: 'black' },
    'p': { name: 'pawn', color: 'black' }
};
exports.fenChessCode = {
    'rook-white': 'R',
    'knight-white': 'N',
    'bishop-white': 'B',
    'queen-white': 'Q',
    'king-white': 'K',
    'pawn-white': 'P',
    'rook-black': 'r',
    'knight-black': 'n',
    'bishop-black': 'b',
    'queen-black': 'q',
    'king-black': 'k',
    'pawn-black': 'p'
};
