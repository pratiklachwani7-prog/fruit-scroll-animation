import React from 'react'
import data from './data.js'
import Canvas from './Canvas.jsx';


const CanvaFrame = (props) => {
  return (
<div className='w-full min-h-screen relative pointer-events-none'>
        {
          data[props.Num].map( (canvasDets , idxDets) => 
          {
              return <Canvas key={idxDets} details={canvasDets} />
          } )
        }
      </div>
  )
}

export default CanvaFrame
