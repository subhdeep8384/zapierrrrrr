// import { on } from 'node:stream'
import React from 'react'

const SignInButtons = ({children , color , onclick } : {children : React.ReactNode , color : string , onclick : () => void}) => {
  return (
    <div onClick={onclick} className={`border-1 border-gray-400 rounded-md px-7 py-1  bg-${color}-500 hover:shadow-md hover:bg-white cursor-grab`}>
      {children}
    </div>
  )
}

export default SignInButtons
