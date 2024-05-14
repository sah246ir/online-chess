import React from 'react'  
import { CapturesType, Piece } from '../utils/ChessLogic/chessTypes'
interface PropTypes {
  captures: CapturesType,
  rotate:boolean
}
const Captures = ({ captures,rotate }: PropTypes) => {
  return (
    <div className={`flex w-full min-h-8 ${rotate?'justify-end':''}`}>
      <div className="flex captures items-center" >
        {captures.captures.map((pc: Piece) => {
          let img = require(`../pieces/${pc.color}-${pc.name}.png`)
          return (
            <p>
              <img className={`${rotate?'rotate-180':''}`} width="30" src={img} alt={`${pc.color} ${pc.name}`} />
            </p>
          )
        })} 
      </div>
    </div>
  )
}

export default Captures
