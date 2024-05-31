import React from 'react'

interface propTypes{
    tab:number,
    setTab:Function,
    online:boolean
}
const SideBoardNav = ({tab,setTab,online}:propTypes) => { 
  let active = "border-white bg-gray-700 text-white"
  let unactive = "border-transparent"
  return (
    <div className='bg-black flex '>
      <button onClick={()=>setTab(1)} className={`transition transition-delay-900 font-semibold text-gray-400 flex-grow p-2 border border-0 border-b-2 ${tab==1?active:unactive}`}>
        Moves
      </button>
      {online?
      <button onClick={()=>setTab(2)} className={`transition transition-delay-900 font-semibold text-gray-400 flex-grow p-2 border border-0 border-b-2 ${tab==2?active:unactive}`}>
        Chat
      </button>
      :null}
    </div>
  )
}

export default SideBoardNav
