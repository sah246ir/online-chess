import React from 'react'
import DialogWrapper from './dialogWrapper'
import { Link } from 'react-router-dom'

interface propTypes{
    id:string | undefined
}
const GameLinkDialog = ({id}:propTypes) => {
    return (
        <DialogWrapper>
            <div className="bg-gray-800 w-96 h-96 p-5 flex flex-col justify-between">
                <h1 className='text-white text-3xl mb-11'>Invite Player</h1>
                <div className=" ">
                    <div className='text-nowrap whitespace-nowrap flex items-center bg-gray-600 w-full '>
                        <p className='text-white p-2 w-full overflow-auto'>https://lichess.org/{id}</p>
                        <i className='text-white fa fa-copy w-11 cursor-pointer'></i>
                    </div>
                    <button className='mt-5 transition duration-500 bg-gray-500 px-4 py-1 hover:bg-gray-600 mb-5 text-gray-100'>
                        share link&nbsp;&nbsp;
                        <i className='fa fa-share'></i>
                    </button>
                </div>
                <Link to={'/'}>
                <button className='w-full mt-5 transition duration-500 bg-gray-700 px-4 py-1 hover:bg-gray-600 mb-5 text-gray-100'>
                    <i className='fa fa-close text-red-700'></i>&nbsp;
                    Cancel invite
                </button>
                </Link>
            </div>
        </DialogWrapper>
    )
}

export default GameLinkDialog
