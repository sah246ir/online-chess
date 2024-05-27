import { PieceType } from "chess-kit";

 
 

interface PropTypes {
  piece: {
    color: "white" | "black";
    name: PieceType
  },
  i: number
  j: number

}

const Piece = ({ piece, i, j }: PropTypes) => {
   let img = require(`../pieces/${piece.color}-${piece.name}.png`)
  return (
    <div className="w-full h-full cursor-pointer flex items-center justify-center p-1"> 
      <img src={img} alt={`${piece.color} ${piece.name}`} />
    </div>
  )
}

export default Piece
