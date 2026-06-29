import React, { useEffect } from 'react'
import Canvas from './components/Canvas'
import CanvaFrame from './components/CanvaFrame'

import LocomotiveScroll from 'locomotive-scroll';

const App = () => {

  useEffect( () => {
    const locomotiveScroll = new LocomotiveScroll();
  } , [] )


  return (
    <>
      <CanvaFrame Num={0}/>
    </>
  )
}

export default App
