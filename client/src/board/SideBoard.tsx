import React from 'react'

interface propTypes{
  children:React.ReactNode
}
export default function SideBoard({children}:propTypes) {
  return (
    <div className="side-board py-5 mt-7 px-3 bg-gray-900 text-white text-center max-h-[544px] overflow-auto">
      {children}
    </div>
  )
}
