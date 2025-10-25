import { NodeTypes } from '@xyflow/react'
import React from 'react'

const MetaDataModel = ({onclose , actionid  , node } : {onclose : ()=> void , actionid : string ,node : NodeTypes }) => {
  console.log("Node is " , actionid)
  return (
    <div>
      {actionid === "solana" ? 
      (<div className='flex flex-col gap-4 p-4'>  
        <input type="text" placeholder='To' className="border-2 border-black rounded-md p-2"/>
        <input type="text" placeholder='Amount' className="border-2 border-black rounded-md p-2"/>
        <button className='bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 mt-4'> update</button>
      </div>) 

      : <div>
        this is email wala page
        </div>} 
    </div>
  )
}

export default MetaDataModel
