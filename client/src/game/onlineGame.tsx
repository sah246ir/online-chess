import { useEffect, useState } from 'react' 
import { gameContext } from '../context/GameContext'
import { ChessBoard } from '../board/ChessBoard'
import { useSocket } from '../hooks/useSocket'
import GameLinkDialog from '../dialog/GameLinkDialog'
import { useParams } from 'react-router-dom'
import OfferDrawDialog from '../dialog/OfferDrawDialog'
import GameOverDialog from '../dialog/GameOverDialog'
import { ChessFrontend } from '../utils/ChessLogic/Chess-frontend'
import { FrontendBoard } from '../utils/ChessLogic/chessTypes'

const OnlineGame = () => {
  const Socket = useSocket()
  const params = useParams()
  // const [Chess] = useState(new ChessGame())
  const [Chess] = useState(new ChessFrontend())
  const [Board, setBoard] = useState<FrontendBoard>(Chess.board)
  const [dialog, setdialog] = useState<boolean>(false)
  const [drawoffer, Setdrawoffer] = useState<"black" | "white" | null>(null)
  useEffect(() => {
    if (!Socket) return
    Socket.send(JSON.stringify({
      type: 'INIT',
      content: {
        code: params.id,
        color: "white"
      }
    }))
    Socket.onmessage = (message: MessageEvent<string>) => {
      let data = JSON.parse(message.data);
      switch (data.type) {
        case "START":
          setdialog(prev => !prev)
          Chess.color = data.color
          break
        case "MOVE":
          console.log(data)
          // Chess.makeMove(data.from, data.to)
          Chess.createBoard(data.board)
          setBoard([...Chess.board])
          break
        case "DRAW":
          if (data.content.type === "offer") {
            Setdrawoffer(data.content.player)
          }
          if (data.content.type === "accept") { 
            Chess.updateResult("-1") 
            setBoard([...Chess.board])
          }
          break
        case "RESIGN":
          let resignee = data.content.player as "black"|"white"
          Chess.updateResult(resignee==="black"?"white":"black")
          setBoard([...Chess.board])
          break
      }
    };
  }, [Socket])



  return (
    <div>
      {/* {dialog
        ?
        <GameLinkDialog id={params.id}></GameLinkDialog>
        : null} */}
      <gameContext.Provider value={{ Chess, setBoard, Board, Socket }}>
        {Chess.winner !== null ?
          <GameOverDialog winner={Chess.winner} player={Chess.color}></GameOverDialog>
          : null}
        {drawoffer ?
          <OfferDrawDialog Setdrawoffer={Setdrawoffer} color={drawoffer}></OfferDrawDialog>
          : null}
        <ChessBoard online></ChessBoard>
      </gameContext.Provider>
    </div>
  )
}

export default OnlineGame
