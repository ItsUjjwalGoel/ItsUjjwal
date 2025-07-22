import React, { useEffect, useRef, useState, lazy, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Grain from '../assets/Grain.gif';
import Image from '../assets/myedit1.jpg';
import { useTheme } from '../Context/ThemeContext';
import Navbar from './navbar';
const WhatIDo = lazy(() => import('./WhatIDo.jsx'));
const Projects = lazy(() => import('./HomeProject.jsx'));
const AboutMe = lazy(() => import('./Info.jsx'));
const LastPage = lazy(() => import('./FootNotes.jsx'));
gsap.registerPlugin(ScrollTrigger);
function Home() {
  const { currentTheme } = useTheme();
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const grainRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const wrapperRefs = useRef([]);
  const barRefs = useRef([]);

  const [width, setWidth] = useState(14);
  const [height, setHeight] = useState(14);
  const [bg, setBg] = useState('rgb(1, 255, 168)');
  const [isHovered, setIsHovered] = useState(false);
  const [top, setTop] = useState(0);
  const [border, setBorder] = useState(0);
  const [borderradius, setBoderradius] = useState(10);

  const handlemousein = useCallback(() => {
    setIsHovered(true);
    setBg(currentTheme.rgbaLight);
    setWidth(125);
    setHeight(30);
    setTop(-8);
    setBorder(1);
    setBoderradius(7);
  }, [currentTheme]);

  const handlemouseout = useCallback(() => {
    setIsHovered(false);
    setBg(currentTheme.rgb);
    setWidth(14);
    setHeight(14);
    setTop(0);
    setBorder(0);
    setBoderradius(10);
  }, [currentTheme]);

  const setCardRef = (index) => (el) => {
    cardRefs.current[index] = el;
  };

  const setContainerRef = (el) => {
    containerRef.current = el;
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=250%',
            scrub: true,
          },
        }).to(imageRef.current, {
          scaleY: 0.8,
          scaleX: 0.8,
          ease: 'none',
          width: '55vw',
          borderRadius: '40px',
          right: '5vw',
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=250%',
            scrub: true,
          },
        }).to(grainRef.current, {
          scaleY: 0.8,
          scaleX: 0.8,
          ease: 'none',
          width: '55vw',
          borderRadius: '40px',
          right: '4vw',
        });
      } 

      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: true,
          pin: true,
          pinSpacing: 1,
        },
      }).to(textRef.current, {
        y: -30,
        ease: 'none',
      });
      if (containerRef.current && cardRefs.current.length === 4) {
        const stackOffset = 100;
        const scrollOffset = 700;

        gsap.set(cardRefs.current[0], { y: '20vh' });
        gsap.set(cardRefs.current[1], { y: '100vh' });
        gsap.set(cardRefs.current[2], { y: '190vh' });
        gsap.set(cardRefs.current[3], { y: '290vh' });

        cardRefs.current.forEach((card, i) => {
          gsap.to(card, {
            y: 100 + i * stackOffset,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${i * scrollOffset}vh top`,
              end: `${(i + 1) * scrollOffset}vh top`,
              scrub: 1,
              id: `card${i + 1}`,
            },
          });
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollOffset * cardRefs.current.length}vh`,
          pin: true,
          anticipatePin: 1,
          id: 'pin',
        });
      }

      // Bar animations
      wrapperRefs.current.forEach((triggerEl, i) => {
        const targetEl = barRefs.current[i];
        if (triggerEl && targetEl) {
          gsap.fromTo(
            targetEl,
            { height: 0 },
            {
              height: 80,
              ease: 'none',
              scrollTrigger: {
                trigger: triggerEl,
                start: 'top bottom',
                end: '350%',
                scrub: true,
              },
            }
          );
        }
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!isHovered) {
      setBg(currentTheme.rgb);
    }
  }, [isHovered, currentTheme.rgb]);

  return (
    <>
      <Navbar firstvalue={'Home'} forthvalue={'About Me'} thirdvalue={'Projects'} secondvalue={'What I Do'} fifthvalue={'Footnotes'} height={'h-58'} color={`bg-black/40`} margin={'mt-7'}/>

      <div className="bg-black text-white" style={{ scrollBehavior: 'smooth' }}>
        <section id='Home'>
          <section ref={heroRef} className="relative h-screen overflow-hidden bg-transparent backdrop-blur-md">
            <div className="sticky top-0 right-0 h-screen w-screen overflow-hidden pointer-events-none">
              <img
                ref={imageRef}
                loading="lazy"
                src={Image}
                alt="Hero"
                className="absolute top-0 right-0 w-screen h-screen object-cover"
                style={{
                  transformOrigin: 'right',
                  objectPosition: 'center center',

                }}
              />
              <div
                ref={grainRef}
                className="absolute top-0 right-0 w-screen h-screen"
                style={{
                  position: 'fixed',
                  backgroundImage: `url(${Grain})`,
                  backgroundBlendMode: 'overlay',
                  opacity: 0.06,
                  zIndex: 1,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'repeat',
                  transformOrigin: 'right',
                }}
              />
              <div
                ref={textRef}
                className="absolute top-0 left-0 h-full flex items-center pl-5 lg:pl-10 xl:pl-20"
                style={{ width: '50%' }}
              >
                <div>
                  <div
                    className="absolute top-7 left-7 lg:top-13  xl:top-20 xl:left-26 lg:left-13 hover:cursor-default"
                    onMouseEnter={handlemousein}
                    onMouseLeave={handlemouseout}
                    onClick={() => window.location.href = '/contact'}
                  >
                    <div className="mb-15 h-full relative top-20.5 -left-5 z-0">
                      <svg
                        width={width}
                        height={height}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          transition: 'all 0.5s ease',
                          pointerEvents: 'auto',
                          borderRadius: `${borderradius}px`,
                          border: `${border}px solid ${currentTheme.rgb}`,
                          filter: isHovered ? `drop-shadow(0 0 8px ${currentTheme.rgb.replace('rgb', 'rgba').replace(')', ', 0.3)')})` : 'none',
                          willChange: 'transform'
                        }}
                      >
                        <rect
                          x="0"
                          y="0"
                          width={width}
                          height={height}
                          rx={isHovered ? 6 : height / 2}
                          ry={isHovered ? 6 : height / 2}
                          fill={bg}
                          style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
                        />
                      </svg>
                    </div>
                    <div
                      className="relative mb-16 z-1 text-xl  font-light ibm-plex-sans text-[#e8e8e3]"
                      style={{ top: `${top}px`, transition: 'all 0.5s ease', pointerEvents: 'auto' }}
                    >
                      CONTACT
                    </div>
                  </div>
                  <div className="cormorant-garamond xl:pt-20 lg:pt-10 md:pt-8 font-light  xl:text-6xl lg:text-4xl text-[#e8e8e3]">
                    <div>Developer by skill</div>
                    <div>Explorer by heart</div>
                    <div>Contributor by choice</div>
                  </div>
                  <div className="pt-20 pr-20 xl:text-xl font-light ibm-plex-sans text-[#e8e8e3]">
                    <div>FULLSTACK DEVELOPER</div>
                    <div>DATA STRUCTURES AND ALGORITHM ENTHUSIAST</div>
                    <div>OPEN SOURCE CONTRIBUTOR</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <WhatIDo setCardRef={setCardRef} setContainerRef={setContainerRef} />
        <div className='bg-[#e8e8e3] w-full h-20'></div>
        <Projects />
        <AboutMe />
        <LastPage />
      </div>
    </>
  );
}

export default Home;