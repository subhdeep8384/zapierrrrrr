import React, { ReactNode } from 'react'

const LinkButton = ({ children  , onclick } : {children : ReactNode , onclick : () => void}) => {
  return (
    <div className='flex px-10 py-1 cursor-pointer hover:bg-slate-200 hover:text-black hover:shadow-md  rounded-2xl text-sm  ' onClick={onclick}>
        { children }
    </div>
  )
}

export default LinkButton
