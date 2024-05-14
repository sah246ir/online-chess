import React, { useState } from 'react' 
import { gameContext } from '../context/GameContext'
import { ChessBoard } from '../board/ChessBoard'
import GameOverDialog from '../dialog/GameOverDialog'
import { ChessFrontend } from '../utils/ChessLogic/Chess-frontend'
import { FrontendBoard } from '../utils/ChessLogic/chessTypes'
const OfflineGame = () => {
  const [Chess] = useState(new ChessFrontend( )) 
  const [Board, setBoard] = useState<FrontendBoard>(Chess.board)
  return (
    <div>
      {Chess.winner?
      <GameOverDialog winner={Chess.winner} player={null}></GameOverDialog> 
      :null} 
      <gameContext.Provider value={{ Chess, setBoard, Board,Socket:null }}> 
        <ChessBoard online={false}></ChessBoard>
      </gameContext.Provider>
    </div>
  )
}

export default OfflineGame
