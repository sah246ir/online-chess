import { useEffect, useState } from 'react' 
import { gameContext } from '../context/GameContext'
import { ChessBoard } from '../board/ChessBoard'
import { useSocket } from '../hooks/useSocket'
import GameLinkDialog from '../dialog/GameLinkDialog'
import { useParams } from 'react-router-dom'
import OfferDrawDialog from '../dialog/OfferDrawDialog'
import GameOverDialog from '../dialog/GameOverDialog' 
import { ChessFrontend,ChessSquare,FrontendBoard } from 'chess-kit'
import { MovesMade } from '../types'
 
const OnlineGame = () => {
  const Socket = useSocket()
  const params = useParams() 
  const [Chess] = useState(new ChessFrontend())
  const [Board, setBoard] = useState<FrontendBoard>(Chess.board)
  const [Moves,setMoves] = useState<MovesMade[]>([])
  const [dialog, setdialog] = useState<boolean>(true)
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
          setdialog(false)
          Chess.createBoard(data.board)
          setBoard([...Chess.board])
          setMoves([...data.moves])
          Chess.color = data.color
          break
        case "MOVE": 
          console.log(data,Moves)
          Chess.createBoard(data.board)
          Chess.captured = data.captures
          setBoard([...Chess.board])
          setMoves(moves => [...moves,{
            from:data.move.from as ChessSquare,
            to:data.move.to as ChessSquare,
          }])
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
      {dialog
        ?
        <GameLinkDialog id={params.id}></GameLinkDialog>
        : null}
      <gameContext.Provider value={{ Chess, setBoard, Board, Socket, setMoves }}>
        {Chess.winner !== null ?
          <GameOverDialog winner={Chess.winner} player={Chess.color}></GameOverDialog>
          : null}
        {drawoffer ?
          <OfferDrawDialog Setdrawoffer={Setdrawoffer} color={drawoffer}></OfferDrawDialog>
          : null}
        <ChessBoard online moves={Moves}></ChessBoard>
      </gameContext.Provider>
    </div>
  )
}

export default OnlineGame
