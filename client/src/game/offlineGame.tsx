import React, { useState } from 'react' 
import { gameContext } from '../context/GameContext'
import { ChessBoard } from '../board/ChessBoard'
import GameOverDialog from '../dialog/GameOverDialog' 
import { ChessFrontend,ChessSquare,FrontendBoard } from 'chess-kit'
import { MovesMade } from '../types'


const OfflineGame = () => {
  const [Chess] = useState(new ChessFrontend( )) 
  const [Board, setBoard] = useState<FrontendBoard>(Chess.board)
  const [Moves,setMoves] = useState<MovesMade[]>([])
  return (
    <div>
      {Chess.winner?
      <GameOverDialog winner={Chess.winner} player={null}></GameOverDialog> 
      :null} 
      <gameContext.Provider value={{ Chess, setBoard, Board,Socket:null,setMoves }}> 
        <ChessBoard online={false} moves={Moves}></ChessBoard>
      </gameContext.Provider>
    </div>
  )
}

export default OfflineGame
