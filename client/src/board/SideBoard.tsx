import React from 'react'

interface propTypes{
  children:React.ReactNode
}
export default function SideBoard({children}:propTypes) {
  return (
    <div className=" sm:mt-7 side-board py-5 px-3 bg-gray-900 text-white text-center max-h-[434px] md:max-h-[560px] overflow-auto">
      {children}
    </div>
  )
}
