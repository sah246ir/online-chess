import React, { useContext } from 'react'; 
import Piece from './Piece';
import { gameContext } from '../context/GameContext';
import { useParams } from 'react-router-dom';
import { CellType } from 'chess-kit';
import { MovesMade } from '../types';
const cellColor = {
  black: 'cell-black',
  white: 'cell-white',
};

interface PropTypes {
  cell: CellType;
  i: number;
  j: number;
}

export default function Cell({ cell, i, j }: PropTypes) {
  const board = useContext(gameContext)
  const params = useParams( )
 
  function highlightColor(){
    if (cell.selected) {
      return cell.cell_color === "black" ? 'bg-blue-400' : 'bg-blue-300'
    }else if (board.Chess.winner && cell.piece?.color!==board.Chess.winner && cell.piece?.name==="king") {
      return 'bg-red-900' 
    } else if (cell.highlight && cell.piece) {
      return cell.cell_color === "black" ? 'bg-red-400' : 'bg-red-300'
    }else{
      return cellColor[cell.cell_color]
    }
  }
  function cellClick() { 
    if (cell.piece && cell.piece.color !== board.Chess.turn && !cell.highlight) {
      return
    }
    else if (cell.piece && cell.piece.color === board.Chess.turn) {
      handlePieceSelection();
    } else if (!cell.piece && !cell.highlight) {
      handleEmptyClick();
    } else {
      handleMovement();
    }
  }  
  function handlePieceSelection() {
    if(!cell.piece) return
    board.Chess.unsetSelected();
    board.Chess.setSelected(cell.square);
    board.Chess.unhighlightMoves();
    board.Chess.highlightMoves(cell.square, board.Chess.board);
    board.setBoard([...board.Chess.board]);
  } 
  function handleEmptyClick() {
    board.Chess.unsetSelected();
    board.Chess.unhighlightMoves();
    board.setBoard([...board.Chess.board]);
  } 
  function handleMovement() {
    if(!board.Chess.selected) return
    let from = board.Chess.selected
    let moved = board.Chess.makeMove(board.Chess.selected,cell.square);
    if(moved){
      board.setMoves((moves:MovesMade[])=>[...moves,{
        from,
        to:cell.square
      }])
      board.setBoard([...board.Chess.board]); 
    }
    if(board.Socket && moved){ 
      board.Socket.send(JSON.stringify({
        type:"MOVE",
        content:{
          code:params.id,
          from:from,
          to:cell.square 
        }
        
      }))
    }
  } 
  let size = "w-[4.25em] h-[4.25em]" 
  return (
    <div onClick={cellClick} className={`${size} ${highlightColor()} flex items-center justify-center ${ board.Chess.color==="black"?'rotate-180':''}`}>
 
      {cell.piece ? (
        <Piece i={i} j={j} piece={cell.piece} />  
      ) :

        cell.highlight ? (
          <div className="w-3 h-3 bg-black opacity-25 rounded-full"></div>
        ) :
          null}

    </div>
  );
}
