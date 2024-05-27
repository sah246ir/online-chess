import React from 'react'
import DialogWrapper from './dialogWrapper'
import { Link } from 'react-router-dom'

interface propTypes{
    id:string | undefined
}
const GameLinkDialog = ({id}:propTypes) => {
    return (
        <DialogWrapper>
            <div className="bg-gray-800 w-full sm:w-96 p-5 flex flex-col justify-between">
                <h1 className='text-white text-3xl mb-11'>Invite Player</h1>
                <div className=" ">
                    <div className='text-nowrap whitespace-nowrap flex gap-3 items-center bg-gray-600 w-full'>
                        <div className="overflow-auto p-2">
                            <p className='text-white'>http://chess.stellartech.space/vhn345tre</p> 
                        </div>
                        <i className='text-white fa fa-copy w-11 cursor-pointer'></i>
                    </div>
                    <button className='mt-5 transition duration-500 bg-gray-700 px-4 py-1 hover:bg-gray-600 mb-5 text-gray-100'>
                        share&nbsp;&nbsp;
                        <i className='fa fa-share'></i>
                    </button>
                </div>
                <Link to={'/'}>
                <button className='w-full mt-5 transition duration-500 bg-gray-700 px-4 py-1 hover:bg-gray-600 mb-5 text-gray-100'>
                    <i className='fa fa-arrow-left'></i>&nbsp;
                    Back to home
                </button>
                </Link>
            </div>
        </DialogWrapper>
    )
}

export default GameLinkDialog
