import { useContext } from 'react'
import BoardRow from './BoardRow'
import { gameContext } from '../context/GameContext'
import Captures from './Captures'
import { useParams, Navigate } from 'react-router-dom'
import { FrontendBoard } from 'chess-kit'
import { MovesMade } from '../types'
import SideBoard from './SideBoard'
import NotationTable from './NotationTable'

interface propTypes {
  online: boolean;
  moves: MovesMade[];
}
export const ChessBoard = ({ online, moves }: propTypes) => {
  const board = useContext(gameContext)
  const params = useParams()
  const restart = () => {
    if (window.confirm("Your entire game will be lost are you sure?")) {
      Navigate({ to: "/play/offline" })
    }
  }
  const resign = () => {
    if (window.confirm("You will lose the game after resigning are you sure?")) {
      let resignee = board.Chess.color || board.Chess.turn
      board.Chess.updateResult(resignee === "black" ? "white" : "black")
      board.setBoard([...board.Chess.board])
      if (online && board.Socket) {
        board.Socket.send(JSON.stringify({
          type: "RESIGN",
          content: {
            code: params.id,
            player: board.Chess.color
          }
        }))
      }
    }
  }
  const offerdraw = () => {
    if (board.Socket && board.Chess.color) {
      board.Socket.send(JSON.stringify({
        type: "DRAW",
        content: {
          code: params.id,
          player: board.Chess.color,
          type: "offer"
        }
      }))
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-3">
      <div className="flex flex-wrap gap-5 justify-center">
        <button onClick={restart} className=' transition duration-500 rounded bg-blue-700 px-6 py-2 hover:bg-blue-800 text-gray-100'>
          Restart
        </button>
        <button onClick={resign} className=' transition duration-500 rounded bg-red-700 px-6 py-2 hover:bg-red-800 text-gray-100'>
          Resign
        </button>
        {online ?
          <button onClick={offerdraw} className=' transition duration-500 rounded bg-gray-600 px-6 py-2 hover:bg-gray-700 text-gray-100'>
            Offer Draw
          </button>
          : null}
      </div> 
        <div className={`board-area mt-6`}>
          <div className="flex flex-col lg:flex-row">
            <div className={`${board.Chess.color === "black" ? 'rotate-180' : ''}`}>
              <div className="flex justify-between items-baseline mb-1">
                <Captures captures={board.Chess.getCaptures("black")} rotate={board.Chess.color === "black" ? true : false}></Captures>
                {board.Chess.color === "white" && board.Chess.turn === "black" ?
                  <p className='w-full text-right text-white text-xs'>waiting for black to move &nbsp;
                    <i className="fa fa-spin fa-hourglass"></i>
                  </p>
                  : null}
              </div>
              <div className={`board flex flex-col `}>
                {board.Board.map((row: FrontendBoard[0], i: number) => {
                  return (
                    <BoardRow key={i} row={row} i={i} />
                  )
                })}
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <Captures captures={board.Chess.getCaptures("white")} rotate={board.Chess.color === "black" ? true : false}></Captures>
                {board.Chess.color === "black" && board.Chess.turn === "white" ?
                  <p className={`${board.Chess.color === "black" ? "rotate-180 text-left" : "text-right"}   w-full text-white text-xs`}>waiting for white to move &nbsp;
                    <i className="fa fa-spin fa-hourglass"></i>
                  </p> : null}
              </div>
            </div>
            <SideBoard online={online} moves={moves} />
          </div> 
        </div> 
    </div>
  )
}
