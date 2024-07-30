import React, { useState } from 'react'
import DialogWrapper from './dialogWrapper'
import { Link } from 'react-router-dom'

interface propTypes{
    id:string | undefined
}
const GameLinkDialog = ({id}:propTypes) => {
    const [copied,setCopied] = useState<boolean>(false)
    const [link] = useState<string>(`${process.env.REACT_APP_HOST_URL || 'http://localhost:3000'}/${id}`)
    const copy = ()=>{
        navigator.clipboard.writeText(link)
        if(!copied){
            setCopied(prev=>!prev)
            setTimeout(()=>setCopied(prev=>!prev),3000)
        } 
       
    }
    return (
        <DialogWrapper>
            <div className="bg-gray-900 w-full sm:w-96 p-5 flex flex-col justify-between">
                <h1 className='text-white text-3xl mb-11'>Invite Player</h1>
                <div className=" ">
                    <div className='text-nowrap whitespace-nowrap flex gap-1 items-center  w-full justify-between'>
                        <div className="overflow-auto p-1 px-2 border border-1 border-gray-700 hover:border-gray-500 flex-grow">
                            <p className='text-white'>{process.env.REACT_APP_HOST_URL || 'http://localhost:3000'}/{id}</p> 
                        </div>
                        <div onClick={copy} className='transition cursor-pointer px-2 size-9 hover:bg-gray-800 grid place-items-center'>
                            {copied?
                            <i className="fa fa-check text-green-400"></i> 
                            :
                            <i className="fa fa-copy text-green-400"></i>}
                        </div>
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
