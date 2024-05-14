import React from 'react'
import DialogWrapper from './dialogWrapper'
import { Link } from 'react-router-dom'


let newgame = require("../img/newgame.png")
let exit = require("../img/back.png")

interface propTypes {
    winner: "black" | "white" | "-1",
    player: "black" | "white" | null
}
const GameOverDialog = ({ winner,player }: propTypes) => {
    return (
        <DialogWrapper>
            <div className={`relative bg-amber-900 w-96 h-96 p-5 flex flex-col justify-around`}>
                <div className="absolute top-5 left-5 text-3xl">{winner === "-1" ? '🥉' : '🎉'}</div>
                <div className="absolute bottom-5 right-5 text-3xl">{winner === "-1" ? '⚔️' : '🏆'}</div>

                <div className="mt-8 text-4xl font-semibold text-amber-100 flex flex-col gap-5">
                    {winner === "-1"
                        ?
                        <><h1 >MATCH DRAWN</h1></>
                        :
                        <>
                            <h1>{player && winner!==player?'SIKES!':'WOHOO!'}</h1>
                            <h1>{winner.toUpperCase()} WINS!</h1>
                        </>
                    }
                </div>
                <div className="flex justify-between mt-5 text-xl text-white">
                    <p >Moves: 50</p>
                    <p >Total Time: 50 min</p>
                </div>
                <div className="flex gap-5 justify-center mt-7 mb-8">
                    <Link to={'/play/offline'}>
                        <img width={"50"} className='cursor-pointer' src={newgame} alt="newgame" />
                    </Link>
                    <Link to={'/'}>
                        <img width={"50"} className='cursor-pointer' src={exit} alt="exit" />

                    </Link>
                </div>
            </div>
        </DialogWrapper>
    )
}

export default GameOverDialog
