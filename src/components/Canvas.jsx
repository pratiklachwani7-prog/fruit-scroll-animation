import React, { useEffect, useRef, useState } from 'react'
import canvasImages from './canvasImages.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Canvas = (props) => {

    const { startIndex , numImages , duration , size , top , left , zIndex } = props.details ;

    const [index, setIndex] = useState( {value : startIndex } )
    const canvasRef = useRef(null) ;

    useGSAP( () => {


        gsap.to(index,{
            value: startIndex + numImages - 1  ,
            duration:duration ,
            repeat:-1,
            ease:"linear",
            onUpdate: () => {
                setIndex( { value : Math.round(index.value) } )
            } ,
            
        });
    } )


    useEffect( () => {
        const canvas = canvasRef.current ;
        const ctx = canvas.getContext("2d");
        const img = new Image() ;
        img.src = canvasImages[index.value] ;
        img.onload = () => {
            const scale = window.devicePixelRatio ;
            canvas.width = canvas.offsetWidth * scale ;
            canvas.height = canvas.offsetHeight * scale  ;
            canvas.style.width = canvas.offsetWidth + "px" ;
            canvas.style.Height = canvas.offsetHeight + "px" ;
            ctx.scale(scale,scale);
            ctx.drawImage(img , 0 , 0 , canvas.offsetWidth , canvas.offsetHeight);
        } ;
    } , [index] ) 




  return (
    <canvas ref={canvasRef} 
    data-scroll
    data-scroll-speed={Math.random().toFixed(2)}
    className='absolute'
    style={{width : `${size*1.2}px` , height : `${size*1.2}px` , top : `${top}%` , left : `${left}%` , zIndex: `${zIndex}%` }}
    id="canvas">
      
    </canvas>
  )
}

export default Canvas
