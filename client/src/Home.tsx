import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid' 
const newUuid = uuid()
let boardimg = require("./img/board.png")
const Home = () => {
    return (
        <div className="flex justify-center items-center p-4 min-h-screen"> 
            <div className='flex justify-center items-center p-5 gap-10 max-w-[63em] flex-col-reverse lg:flex-row'>
                <img width="500" className='rounded-md' src={boardimg} alt=" laptop screen displaying two players playing online chess" />
                <div className="container w-full flex flex-col justify-center gap-5">
                    <h1 className='text-white text-5xl text-center font-medium mb-12'> Play Chess Online! </h1>
                    <Link to={`/${newUuid}`}>
                    <button className='w-full transition duration-500 rounded bg-green-700 px-10 py-3 hover:bg-green-800'>
                        <span className=' text-2xl text-white font-semibold'>Play With A Friend</span> <br />
                        <p className='text-gray-100'>Share Game Link With A Friend To Play</p>
                    </button>
                    </Link>

                    <Link to="/play/offline">
                    <button className='w-full transition duration-500 rounded bg-blue-700 px-10 py-3 hover:bg-blue-800'>
                        <span className=' text-2xl text-white font-semibold'>PLAY OFFLINE</span> <br />
                        <p className='text-gray-100'>Play Over The Board With A Friend</p> 
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
