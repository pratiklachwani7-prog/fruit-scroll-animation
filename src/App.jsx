import React, { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";
import CanvaFrame from "./components/CanvaFrame";
import ReactCurvedText from "react-curved-text";
import LocomotiveScroll from "locomotive-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import images from './components/canvasImages.js'

const App = () => {

  gsap.registerPlugin(ScrollTrigger) ;
  const circleRef = useRef(null);
  const cursorRef = useRef(null);
  const ImageRef = useRef(null);
  const revealRef = useRef(null);
  const fruitsRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useGSAP( () => {
      gsap.to(circleRef.current , {
        rotate:360,
        repeat:-1,
        duration:10,
        onUpdate: () => {
          
        }
  } ) } ) ;

  useEffect(() => 
    {
      const move = (dets) => 
      {
        gsap.to(cursorRef.current, 
        {
          x: (dets.x - 8) ,
          y: (dets.y - 10),
          duration:0.2,
          ease:"linear",
        });
      };
      document.addEventListener("mousemove",move);

  } , []);

  const handleClick = (dets) => 
  {
    console.log("Clicked");
    if (showCanvas == false)
    {
      let newX = dets.clientX ;
      let  newY = dets.clientY
      revealRef.current.style.zIndex = 0 ;
      fruitsRef.current.style.zIndex = 0 ;
      gsap.from(revealRef.current , {
          width:"15px",
          height:"15px",
          x:newX,
          y:newY,
          duration:0.3,
          borderRadius:"50%",
          opacity:0,
          scale:0.1,
      })
      gsap.from(fruitsRef.current , {
        duration:0.8,
        opacity:0,
      })
    }
    else //already red color 
    {
      gsap.to(revealRef.current , {
          opacity:0,
          duration:0.7, 
      })
      gsap.to(fruitsRef.current , {
          opacity:0,
          duration:0.7,
      })

    }



  }

  return (
    <div style={{backgroundColor : showCanvas ? "white" : "white"}}  className="">
      <div ref={cursorRef} 
      style={ {
        backgroundColor : showCanvas ? "white" : "#FD2C2A"
      } }
      className={`w-10 h-10 rounded-full fixed z-2 pointer-events-none`}>
        {
          showImage ? <img ref={ImageRef} src={images[5]} alt="" /> : null
        }
      </div>
      <div ref={revealRef} className="bg-[#FD2C2A] w-full h-[200vh] absolute -z-1 pointer-events-none opacity-100">
        
      </div>
      <div className="w-full h-screen relative">
        <div ref={fruitsRef} className="absolute w-full h-full pointer-events-none -z-1">
          <CanvaFrame Num={0} />
        </div>
        <nav className="w-full h-23 flex justify-between p-5 text-3xl items-center">
          <div>Thirtysixstudio</div>
          <div className="w-[55vw] h-full flex justify-between">
            {[
              "What we do",
              ,
              "Who we are",
              "How we give back",
              "Talk to us",
            ].map((elem, idx) => {
              return (
                <a href={`${elem.toLowerCase()}`} key={idx}>
                  {elem}
                </a>
              );
            })}
          </div>
        </nav>
        <div className="w-full px-[22vw] py-[3vh] flex gap-12">
          <div className="w-[25vw] ">
            <h3 className="text-4xl leading-[2.4vw] font-semibold">
              At Thirtysixstudio, we build digital assets and immersive
              experiences for purposeful brands.
            </h3>
            <br />
            <br />
            <p className="text-1xl leading-[2.5vh] font-normal">
              We're a boutique production studio focused on design, animation,
              and technology, constantly rethinking what digital craft can do
              for present-day ads and campaigns.
            </p>
            <br />
            <p className="text-1xl leading-[2.5vh] font- ">Scroll</p>
          </div>
          <div
            className="circle w-[25vw] flex items-center justify-center"
            ref={circleRef}
          >
            <ReactCurvedText
              width={300}
              height={300}
              cx={150}
              cy={150}
              rx={90}
              ry={90}
              text="THIRTYSIXSTUDIO - FOR ALL THINGS DIGITAL -"
              textProps={{
                style: {
                  fill: "black",
                  fontSize: 27,
                },
              }}
            />
          </div>
        </div>
        <div 
        onMouseEnter={ () => {
          setShowImage(true);
          gsap.to(cursorRef.current , 
            {
              scale:2,
              
            })
        } }
        onMouseLeave={ () => {
          setShowImage(false) ;
          gsap.to(cursorRef.current , 
            {
              scale:1,
            })
        } }
        onClick={ (dets) => 
        {
          setShowCanvas(prev => !prev) ;
          handleClick(dets) ;
        }
        }
        className="w-full mt-32 flex ">
          <h1 className="flex items-center justify-center text-[13.6vw] tracking-wider font-normal">
            Thirtysixstudio
          </h1>
        </div>
      </div>
    </div>
  );
};

export default App;
