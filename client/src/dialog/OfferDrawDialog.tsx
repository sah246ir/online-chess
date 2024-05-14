import React, { useContext } from 'react'
import DialogWrapper from './dialogWrapper'
import { gameContext } from '../context/GameContext'
import { useParams } from 'react-router-dom'

 
interface propTypes{
    Setdrawoffer:any
    color:"white"|"black"
}
const OfferDrawDialog = ({Setdrawoffer,color}:propTypes) => {
    const game = useContext(gameContext)
    const params = useParams()
    const handleDraw = (action:"accept"|"decline")=>{
        if(!game.Socket) return
        game.Socket.send(JSON.stringify({
            type:"DRAW",
            content:{
              code:params.id,
              player:game.Chess.color,
              type:action
            }
          }))
        if(action==="accept") game.Chess.updateResult("-1")
        Setdrawoffer(false)
        
    } 
    return (
        <DialogWrapper>
            <div className={`relative bg-amber-900 w-96 h-96 p-5 flex flex-col justify-center`}>
                <div className="absolute top-5 left-5 text-3xl">🥉</div>
                <div className="absolute bottom-5 right-5 text-3xl">⚔️</div>

                <div className="mt-8 text-4xl font-semibold text-amber-100 flex flex-col gap-5">
                <h1>{color.toUpperCase()} OFFERS DRAW?</h1>  
                </div> 
                <div className="flex gap-5 justify-center mt-7 mb-8">
                     <i onClick={()=>handleDraw("accept")} className="fa fa-check text-4xl text-green-600"><span className="sr-only">accept</span></i>
                     <i onClick={()=>handleDraw("decline")} className="fa fa-close text-4xl text-red-600"><span className="sr-only">decline</span></i>
                </div>
            </div>
        </DialogWrapper>
    )
}

export default OfferDrawDialog
