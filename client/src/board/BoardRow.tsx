import React from 'react' 
import Cell from './Cell' 
import { CellType, FrontendBoard } from 'chess-kit';
interface PropTypes {
  row: FrontendBoard[0];
  i:number
}

const BoardRow = ({ row,i }: PropTypes) => {
  return (
    <div className='flex'>
      {row.map((cell: CellType, j) => {
        return (
          <Cell key={j} cell={cell} i={i} j={j}/>
        )
      })}
    </div>
  )
}

export default BoardRow
