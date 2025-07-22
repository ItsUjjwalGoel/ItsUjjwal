import React, { useEffect, useState } from 'react';
import './Preloader.css';

export default function Preloader({ finish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      return () => clearTimeout(timer);
    }, 5000);
  }, [finish])

  const [number, setNumber] = useState(0);
  const [finished, setfinised] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setfinised(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-screen h-lvh bg-black flex justify-center items-center relative overflow-hidden transition-all duration-1000 ${finished ? 'bg-white' : 'bg-black'} ${finished ? 'opacity-0' : 'opacity-100'}`} >
    
      <div className={`text-[200px] wave  absolute  text-[darkred] z-10 viaoda-libre-regular font-extrabold transition-all duration-1000  `}>
        WELCOME
      </div>

      <div className={`text-[200px] absolute z-30 viaoda-libre-regular textarea font-extrabold transition-all duration-1000  `}>
        WELCOME
      </div>

      <div className='text-[15px] text-[#e8e8e3] absolute right-40 bottom-75'>
        loading ... {number}%
      </div>
    </div>
  );
}
