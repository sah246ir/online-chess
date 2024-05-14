import React from "react"; 
import { ChessFrontend } from "../utils/ChessLogic/Chess-frontend";
import { CellType } from "../utils/ChessLogic/chessTypes";
interface gameContextType{
    // Chess:ChessGame ,
    Chess:ChessFrontend ,
    setBoard:Function,
    Board:CellType[][],
    Socket:WebSocket | null
}
export const gameContext = React.createContext<gameContextType>({
    // Chess:new ChessGame(),
    Chess:new ChessFrontend(),
    setBoard:()=>{},
    Board:[],
    Socket:null  
});  