import React, { useState } from 'react'
import SideBoardNav from './SideBoardNav'
import NotationTable from './NotationTable'
import { MovesMade } from '../types';
import Chat from './Chat';

interface propTypes{ 
  online:boolean
  moves: MovesMade[];
}
export default function SideBoard({online,moves}:propTypes) {
  const [tab,setTab] = useState<number>(1)
  return (
    <div className="flex w-full lg:w-[350px] flex-col  gap-2  p-3 sm:mt-7 side-board bg-gray-900 text-white text-center h-[434px] md:h-[560px] min-w-[192px]">
      <SideBoardNav online={online}   tab={tab} setTab={setTab}/> 
      {tab===1 && <NotationTable moves={moves} />  }
      {tab===2 &&  <Chat />  }
     
     
    </div>
  )
}
