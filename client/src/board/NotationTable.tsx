import React from 'react'
import { MovesMade } from '../types' 
interface propTypes {
    moves: MovesMade[]
}
export default function NotationTable({ moves }: propTypes) {
    return (
        <div className=" ">
            <div className={` flex gap-3 px-3 `} > 
            </div>
            {moves.map((move, i) => {
                return (
                    <div className={`${i%2===0?"bg-gray-900":"bg-gray-800"} flex gap-3  py-3 px-3 justify-around `} key={i}>
                        <p className='text-gray-400'>{i + 1}.</p>
                        <p className=''>{move.from}</p>
                        <p className=' '>{move.to}</p>
                    </div>
                )
            })}
        </div>

    )
}
