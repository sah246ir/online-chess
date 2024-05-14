 
// import { CellType,ChessSquare,parseNotation } from "./chessgame" 
import { parseNotation } from "./utils";
import { ChessSquare,CellType,MoveFunction, PieceType, CellTypeMinimal, Moves } from "./chessTypes";
export const getRookMoves:MoveFunction = (notation,color,board): Moves => { 
    let [i,j] = parseNotation(notation)
    let moves: Moves  = [] 
    const directions = [
        [-1,0], 
        [1, 0],
        [0, -1],
        [0, 1]

    ]; 
    for (const [dx, dy ] of directions) {
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
    return moves
}



 
export const getKnightMoves:MoveFunction = (notation,color,board): Moves => {
    let [i,j] = parseNotation(notation)
    let moves: Moves  = [] 
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
        if (x < 0 || x >= 8 || y < 0 || y >= 8){  
            continue;
        }
        processCell(board[x][y].square,color,board,moves)
    }
    return moves 
}



 
export const getBishopMoves:MoveFunction = (notation,color,board): Moves => {
    let [i,j] = parseNotation(notation)
    let moves: Moves  = []  
    const directions:  number[][] = [
        [-1, -1 ], // top-left
        [-1, 1 ],  // top-right
        [1, -1 ],  // bottom-left
        [1, 1 ]    // bottom-right
    ];

    for (const [dx, dy ] of directions) {
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
    return moves
}
 
export const getQueenMoves:MoveFunction = (notation,color,board): Moves => { 
    return [
        ...getBishopMoves(notation,color,board),
        ...getRookMoves(notation,color,board),
    ]
}


 
export const getKingMoves:MoveFunction = (notation,color,board): Moves => {
    let [i,j] = parseNotation(notation)
    let moves: Moves  = [] 
    const directions = [
        [-1, -1], // top-left
        [-1, 0],  // top
        [-1, 1],  // top-right
        [0, -1],  // left
        [0, 1],   // right
        [1, -1],  // bottom-left
        [1, 0],   // bottom
        [1, 1]    // bottom-right
    ];

    for (const [dx, dy] of directions) {
        const x = i + dx;
        const y = j + dy; 
        if (x < 0 || x >= 8 || y < 0 || y >= 8){  
            continue;
        }
        processCell(board[x][y].square,color,board,moves) 
    }

    return moves;
}


 
export const getPawnMoves:MoveFunction = (notation,color,board): Moves => {
    let [i,j] = parseNotation(notation)
    
    let moves: Moves  = [] 
    const direction = (color === 'white') ? -1 : 1; // Direction of pawn movement based on color

    // Normal pawn move
    if (board[i + direction][j].piece === null) {
        let tcell = board[i + direction][ j].square
        moves.push(tcell); 
        if ((color === 'white' && i === 6) || (color === 'black' && i === 1)) {
            if (board[i + 2 * direction][j].piece === null) {
                let cell = board[i + 2 * direction][ j].square
                moves.push(cell);
            }
        }
    }

    // Pawn captures
    const piece = board[i + direction][j - 1]?board[i + direction][j - 1].piece:null
    if (j > 0 && piece && piece.color !== color) {
        let cell = board[i + direction][j - 1].square
        moves.push(cell);
    }
    const piece2 = board[i + direction][j + 1]?board[i + direction][j + 1].piece:null
    if (j < 7 && piece2 && piece2.color !== color) {
        let cell = board[i + direction][j + 1].square
        moves.push(cell);
    } 
    return moves;
         
}

 export const chessPiecesMoves:Record<PieceType,(notation:ChessSquare,color:string,board: (CellType | CellTypeMinimal)[][])=>any> = {
    'rook': getRookMoves,
    'knight': getKnightMoves,
    'bishop': getBishopMoves,
    'queen': getQueenMoves,
    'king': getKingMoves,
    'pawn': getPawnMoves
}; 

function processCell(notation:ChessSquare, color: string, board:(CellType | CellTypeMinimal)[][], moves: Moves) { 
    let [i,j] = parseNotation(notation)
    if (i < 0 || i >= 8 || j < 0 || j >= 8){  
        return false;
    }
    const piece = board[i][j].piece;
    if (piece !== null && piece.color === color) {  
        return false;
    }
    moves.push(notation); 
    return !piece;
}
