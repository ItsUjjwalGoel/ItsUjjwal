import React, { useEffect, useRef, useState, lazy, useCallback } from 'react';
import Grain from '../assets/Grain.gif';

function Navbar({ firstvalue, secondvalue, thirdvalue, forthvalue, fifthvalue, sixthvalue, height, color, margin }) {
    const [colornav, setColornav] = useState('bg-white/60');
    const [rotateclock, setRotateclock] = useState('rotate-0 translate-y-0');
    const [rotateanticlock, setRotateanticlock] = useState('rotate-0 translate-y-0');
    const [visible, setVisible] = useState(false);
    const [visibleText, setVisibleText] = useState(false);
    const handleclicknav = () => {
        setVisible(prev => !prev);
        if (!visible) {
            setColornav('bg-transparent');
            setRotateclock('rotate-45 translate-y-1');
            setRotateanticlock('-rotate-45 translate-y-1');
        } else {
            setColornav('bg-white/60');
            setRotateclock('rotate-0 translate-y-0');
            setRotateanticlock('rotate-0 translate-y-0');
        }
    }

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisibleText(true);
            }, 700); 
            return () => clearTimeout(timer);

        } else {
            setVisibleText(false); 
        }
    }, [visible]);
    return (
        <div className="fixed top-0 left-0 w-full z-[9999]">

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-0" />
            <div
                className="absolute inset-0 -z-0"
                style={{
                    backgroundImage: `url(${Grain})`,
                    backgroundBlendMode: 'overlay',
                    opacity: 0.03,
                    backgroundAttachment: 'scroll',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                }}
            />
            <div className="relative z-10 flex justify-between items-center px-6 py-1">
                <button className="font-ibm text-xl font-[400] text-[#e8e8e3] hover:text-[rgb(133,132,132)] transition-all duration-500  "
                    onClick={() => {
                        window.location.href = '/';
                    }}
                >UJJWAL</button>
                <button className="relative group focus:outline-none">
                    <div className="relative flex items-center justify-center w-[50px] h-[50px] transition-all z-10">
                        <div className="flex flex-col justify-between w-[20px] h-[20px] relative overflow-hidden"
                            onClick={handleclicknav}>
                            <div className={`bg-white/60 h-[2px] w-7 ${rotateclock} transition-all duration-500 origin-[6.5px] `} ></div>
                            <div className={`bg-white/60 h-[2px] w-7  ${rotateanticlock} transition-all duration-500  origin-[6.5px]`}></div>
                            <div className={`${colornav} h-[2px] w-7 transition-all  `}></div>
                        </div>

                    </div>
                    <div
                        className={`${height} w-40 ${color} fixed top-2 right-6 rounded-[6px] z-0 transform transition-all duration-700 ease-in-out ${visible ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-20 opacity-0 pointer-events-none'
                            }`}
                    >
                        {visibleText && (
                            <div
                                className={`${margin} ibm-plex-sans text-xl font-light text-left ml-5 gap-3 flex flex-col justify-center`}
                                style={{
                                    color: '#e8e8e3',
                                    opacity: 0,
                                    animation: 'fadeInText 0.2s ease-in-out forwards',
                                }}
                            >
                                {firstvalue && <a href={`#${firstvalue}`}>{firstvalue}</a>}
                                {secondvalue && <a href={`#${secondvalue}`}>{secondvalue}</a>}
                                {thirdvalue && <a href={`#${thirdvalue}`}>{thirdvalue}</a>}
                                {forthvalue && <a href={`#${forthvalue}`}>{forthvalue}</a>}
                                {fifthvalue && <a href={`#${fifthvalue}`}>{fifthvalue}</a>}
                                {sixthvalue && <a href={`#${sixthvalue}`}>{sixthvalue}</a>}
                            </div>
                        )}


                    </div>
                </button>
            </div >
        </div >
    )
}

export default Navbar