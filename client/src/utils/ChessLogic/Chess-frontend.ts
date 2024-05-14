import { ChessGame } from "./Chess";
import { CellType,ChessSquare, FrontendBoard, Piece, PieceColor } from "./chessTypes"; 
import { chessPiecesMoves } from "./piecemoves";
import { parseNotation } from "./utils";  

const initialboard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w"
export class ChessFrontend extends ChessGame { 
    board: FrontendBoard;
    highlighted: ChessSquare[]
    selected: ChessSquare | ""
    constructor(fenstring?:string) {
        super()  
        this.board = []
        this.highlighted = []
        this.selected = ""
        this.createBoard(fenstring)     
    }    
    createBoard(fen: string | undefined) {
        if(!fen){
            fen = initialboard
        } 
        const [fenboard,turn] = fen.split(" ")
        const rows = fenboard.split("/");
        const Board: FrontendBoard = []; 
        for (let row = 0; row < rows.length; row++) {
            const boardRow  = this.createBoardRow(rows[row], row); 
            const frontendrow:CellType[] = boardRow.map(el=>{
                return {
                    ...el,
                    selected:false,
                    highlight:false
                }
            })
            Board.push(frontendrow);
        } 
        this.board = Board;
        this.turn = turn==="w"?"white":"black"
        this.postMoveTasks("white")
        this.postMoveTasks("black")  
    }
    protected postMoveTasks = (piececolor:PieceColor)=>{  
        this.unsetSelected()
        this.unhighlightMoves()
        let opposition:"white"|"black" = piececolor=== "black" ? "white" : "black"
        let check = this.checkKingThreat(opposition, this.board ) 
        if(check){
            let[x,y] = parseNotation(check)
            this.board[x][y].highlight = true
        }
        if (check && this.isMate(opposition)) this.updateResult(piececolor)
        return
    } 
     
    setSelected(notation: ChessSquare) {
        if (this.color && this.color !== this.turn) return
        this.selected = notation
        let [i, j] = parseNotation(notation)
        this.board[i][j].highlight = true
        this.board[i][j].selected = true
    }
    unsetSelected() {
        if (!this.selected) return
        const [i, j] = parseNotation(this.selected)
        this.board[i][j].highlight = false
        this.board[i][j].selected = false
        this.selected = ""
    }

     
    highlightMoves = (notation: ChessSquare, board: CellType[][]) => {
        let [m,n] = parseNotation(notation)
        let cell:CellType = board[m][n]
        if (!this.selected) return
        if (this.color && this.color !== this.turn) return
        let piece = cell.piece as Piece
        let [x, y] = parseNotation(cell.square)
        let moves: ChessSquare[] = chessPiecesMoves[piece.name](cell.square, piece.color, board)
        moves = moves.filter((notation) => {
            let [i, j] = parseNotation(notation)
            let tmp = this.copyBoard() as CellType[][]
            tmp[i][j].piece = tmp[x][y].piece
            tmp[x][y].piece = null
            let c = !this.checkKingThreat(piece.color, tmp)  
            return c
        }) 
        moves.forEach((notation) => {
            let [mi, mj] = parseNotation(notation)
            this.board[mi][mj].highlight = true
        })
        this.highlighted = moves 
    }
    unhighlightMoves = () => {
        this.highlighted.forEach((notation) => {
            let [mi, mj] = parseNotation(notation)
            this.board[mi][mj].highlight = false
        })
        this.highlighted = []
    } 

}