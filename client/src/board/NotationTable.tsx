import React from 'react'
import { MovesMade } from '../types'

interface propTypes{
    moves:MovesMade[]
}
export default function NotationTable({moves}:propTypes) {
    return (
        <table>
            <thead>
                <tr className=''>
                    <th className='min-w-16 p-2 bg-gray-800'>From</th>
                    <th className='min-w-16 p-2 bg-gray-800'>To</th>
                </tr>
            </thead> 
            <tbody>
                {moves.map((move,i) => {
                    return (
                        <tr key={i}>
                            <td className='p-2 border border-gray-600 border-t-0 border-l-0 border-b-0'>{move.from}</td>
                            <td className='p-2  '>{move.to}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
