import { ChessSquare } from "./chessTypes"

export function parseNotation(notation: ChessSquare) { 
    let row = 8 - parseInt(notation.charAt(1))
    let col = notation.charCodeAt(0) - 97
    return [row, col]
} 