import { parseNotation } from "./utils";
import { CellTypeMinimal, ChessSquare, Piece, PieceColor, chessPieces, piecePoints, Moves, TypeofBoard, CellType, fenChessPieces, Board, fenChessCode } from "./chessTypes";
import { chessPiecesMoves } from "./piecemoves";
var Pieces = "RNBQKBNR";
var colors: PieceColor[] = ["white", "black"];

const initialboard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w"
export class ChessGame {
    board: CellTypeMinimal[][]
    check: ChessSquare | ""
    turn: PieceColor
    captured: Piece[]
    color: PieceColor | null
    winner: PieceColor | "-1" | null
    constructor(fenstring?: string) {
        this.board = []
        this.check = ""
        this.turn = "white"
        this.captured = []
        this.color = null
        this.winner = null
        this.createBoard(fenstring)  
    }
    protected createBoard(fen: string | undefined) {
        if(!fen) fen = initialboard 
        const rows = fen.split("/");
        const Board: Board = []; 
        for (let row = 0; row < rows.length; row++) {
            const boardRow: CellTypeMinimal[] = this.createBoardRow(rows[row], row);
            Board.push(boardRow);
        } 
        this.board = Board; 
    }

    parseBoard(){
        let string = ""
        for(let row of this.board){
            let empty_places = 0
            for(let col of row){
                if(col.piece){
                    if(empty_places>0){
                        string+=empty_places
                        empty_places = 0
                    }
                    string+=fenChessCode[`${col.piece.name}-${col.piece.color}`]
                }else{
                    empty_places+=1
                }
            }
            if(empty_places>0){
                string+=empty_places
                empty_places = 0
            }
            string+='/'
        }
        return string
    }

    protected createBoardRow(cols: string, row: number): CellTypeMinimal[] {
        const boardRow: CellTypeMinimal[] = [];
        let colnum = 0; 
    
        for (let col = 0; col < cols.length; col++) {
            const value = cols[col];
            let color: PieceColor = colors[(row + colnum) % 2]; 
    
            if (isNaN(parseInt(value))) {
                boardRow.push({
                    piece: fenChessPieces[value] as Piece,
                    cell_color: color,
                    square: `${String.fromCharCode(colnum + 97)}${8 - row}` as ChessSquare
                });
                colnum += 1;
            } else {
                for (let empty = 0; empty < parseInt(value); empty++) {
                    let color: PieceColor = colors[(row + colnum) % 2]; 
                    boardRow.push({
                        piece: null,
                        cell_color: color, // Maintain the same color for empty squares
                        square: `${String.fromCharCode((colnum ) + 97)}${8 - row}` as ChessSquare
                    });
                    colnum += 1;
                }
            }
        }
    
        return boardRow;
    }
    
    getCaptures(color: PieceColor): any {
        const opponentColor: PieceColor = color === "white" ? "black" : "white";
        const colorCaptures = this.captured.filter(pc => pc.color === opponentColor);
        const colorPoints = colorCaptures.reduce((acc, pc) => acc + piecePoints[pc.name], 0);
        const opponentCaptures = this.captured.filter(pc => pc.color === color);
        const opponentPoints = opponentCaptures.reduce((acc, pc) => acc + piecePoints[pc.name], 0);
        return {
            captures: colorCaptures,
            points: colorPoints,
            lead: colorPoints - opponentPoints < 0 ? 0 : colorPoints - opponentPoints,
        };
    }
    updateResult(result: PieceColor | "-1" | null) {
        this.winner = result
    }
    getPieces(color: PieceColor, board: TypeofBoard) {
        let pos: ChessSquare[] = []
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j].piece?.color === color) {
                    pos.push(board[i][j].square)
                }
            }
        }
        return pos
    }
    toggleMove() {
        this.turn = this.turn === "white" ? "black" : "white"
    }
    protected postMoveTasks = (piececolor:PieceColor) => {
        let opposition: "white" | "black" = piececolor === "black" ? "white" : "black"
        let check = this.checkKingThreat(opposition, this.board)
        if (check.length > 0 && this.isMate(opposition)) return this.updateResult(this.turn)
        if (check.length > 0) this.check = check
        return
    }
    validateMove(from: ChessSquare, to: ChessSquare): boolean {
        let [x, y] = parseNotation(from)
        let [i, j] = parseNotation(to)
        let piece = this.board[x][y].piece as Piece
        if (piece.color !== this.turn) throw new Error("UH OH! It's not your turn");
        let psbl_movies: Moves = chessPiecesMoves[piece.name](from, piece.color, this.board)
        if (psbl_movies.indexOf(to) === -1) throw new Error(`${piece.name} cannot make this move`);

        let testboard = this.copyBoard()
        testboard[i][j].piece = piece
        testboard[x][y].piece = null
        if (this.checkKingThreat(piece.color, testboard).length > 0) throw new Error(`The king is threatened`);
        return true
    }
    makeMove(from: ChessSquare, to: ChessSquare) {
        let [x, y] = parseNotation(from)
        let [i, j] = parseNotation(to)
        let piece = this.board[x][y].piece
        if (!piece) throw new Error('There is no piece present on ' + from);
        if (!this.validateMove(from, to)) return false
        let capture = this.board[i][j].piece
        if (capture) {
            this.captured.push(capture)
        }
        this.board[i][j].piece = piece
        this.board[x][y].piece = null
        this.postMoveTasks(piece.color)
        this.toggleMove()
        console.log(this.parseBoard())
        return true
    }

    protected copyBoard(): TypeofBoard {
        return JSON.parse(JSON.stringify(this.board))
    }

    checkKingThreat(color: PieceColor, board: TypeofBoard): ChessSquare | "" {
        let threatees: ChessSquare[] = this.getPieces(color === "black" ? "white" : "black", board)
        for (let threat of threatees) {
            let [i, j] = parseNotation(threat)
            let piece = board[i][j].piece as Piece
            let moves: ChessSquare[] = chessPiecesMoves[piece.name](threat, piece.color, board)
            for (let move of moves) {
                let [x, y] = parseNotation(move);
                let pc = board[x][y].piece
                if (pc && pc.name === "king" && pc.color !== piece.color) {
                    return move
                }
            }
        }
        return ""
    }

    protected isMate(color: "white" | "black") {
        let turn_pieces: ChessSquare[] = this.getPieces(color, this.board)
        for (let pos of turn_pieces) {
            let [x, y] = parseNotation(pos)
            let pc = this.board[x][y].piece
            if (!pc) continue
            let moves: ChessSquare[] = chessPiecesMoves[pc.name](this.board[x][y].square, pc.color, this.board);
            for (let notation of moves) {
                let [i, j] = parseNotation(notation)
                let tmp = this.copyBoard()
                tmp[i][j].piece = tmp[x][y].piece
                tmp[x][y].piece = null
                if (!this.checkKingThreat(color, tmp)) {
                    return false
                }
            }
        }
        return true
    } 

}