// piecemoves.d.ts

export type castlingType = "long"|"short"
export type TypeofBoard = CellTypeMinimal[][] | CellType[][]
export type FrontendBoard = CellType[][]
export type Board = CellTypeMinimal[][] 
export type PieceType = 'rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'pawn';

export interface canCastleType{
    long:ChessSquare | "",
    short:ChessSquare | ""
}
export type ChessSquare = "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8" |
    "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" |
    "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8" |
    "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8" |
    "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8" |
    "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" |
    "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" |
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8";
export const chessPieces: Record<string, PieceType> = {
    'R': 'rook',
    'N': 'knight',
    'B': 'bishop',
    'Q': 'queen',
    'K': 'king',
    'P': 'pawn'
};
export interface Piece {
    name: PieceType;
    color: "white" | "black";
}

export interface CellType {
    cell_color: "white" | "black";
    highlight: boolean;
    piece: null | Piece;
    selected: boolean;
    square: ChessSquare;
}

export interface CellTypeMinimal {
    cell_color: "white" | "black"; 
    piece: Piece | null; 
    square: ChessSquare;
}

export interface CapturesType {
    captures: Piece[];
    lead: number;
}

export interface ChessGame {
    board: CellType[][];
    highlighted: ChessSquare[];
    selected: ChessSquare | "";
    check: ChessSquare | "";
    turn: "white" | "black";
    captured: Piece[];
    color: "white" | "black" | null;
    winner: "white" | "black" | "-1" | null;
}

export interface MoveFunction {
    (notation: ChessSquare, color: string, board: (CellType | CellTypeMinimal)[][]): ChessSquare[];
}

export const piecePoints: Record<PieceType, number> = {
    'rook': 5,
    'knight': 3,
    'bishop': 3,
    'queen': 8,
    'king': 0,
    'pawn': 1
}; 
export type Moves = (ChessSquare)[] 

export type PieceColor = "white" | "black"

export const fenChessPieces: Record<string, { name: string, color: string }> = {
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

export const fenChessCode: Record<string, string> = {
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
