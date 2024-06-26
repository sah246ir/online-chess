import React from "react"; 
// import { ChessFrontend } from "../utils/ChessLogic/Chess-frontend";
// import { CellType } from "../utils/ChessLogic/chessTypes";

import { ChessFrontend,CellType } from "chess-kit";

interface Message{
    label:string,
    content:string
}
interface gameContextType{
    // Chess:ChessGame ,
    Chess:ChessFrontend ,
    setBoard:Function,
    setMoves:Function,
    Board:CellType[][],
    Socket:WebSocket | null,
    messages:Message[] | null,
}
export const gameContext = React.createContext<gameContextType>({
    // Chess:new ChessGame(),
    Chess:new ChessFrontend(),
    setBoard:()=>{},
    setMoves:()=>{},
    Board:[],
    Socket:null  ,
    messages:null
});  