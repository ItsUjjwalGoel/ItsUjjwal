import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import Grain from '../assets/Grain.gif';

function LastPage() {
  const navigate = useNavigate();
  const Content = ['HOME', 'PROJECTS', 'ABOUT', 'CONTACT'];
  const links = ['/', '/Projects', '/AboutMe', '/Contact'];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const contactRef = useRef(null);
  const [color, setColor] = useState('text-black')
  const { currentTheme } = useTheme();
  useEffect(() => {
    setInterval(() => {
      setColor('text-black')
    }, 5000);
  }, [color])
  useEffect(() => {
    const preventElasticScroll = (e) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop === 0 && e.deltaY < 0) {
        e.preventDefault();
      }
      if (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0) {
        e.preventDefault();
      }
    };
    document.addEventListener('wheel', preventElasticScroll, { passive: false });
    document.addEventListener('touchmove', preventElasticScroll, { passive: false });

    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.removeEventListener('wheel', preventElasticScroll);
      document.removeEventListener('touchmove', preventElasticScroll);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
          }
        });
      },
      {
        threshold: 0.2, 
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleNavigation = (link, index) => {
    window.location.href = link;
  };

  return (
    <section id='Footnotes'>
      <div
        ref={contactRef}
        className={`bg-black min-h-lvh relative transition-all duration-800 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${Grain})`,
            opacity: 0.03,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        ></div>

        <div className='flex'>
          <div className='w-52vw h-lvh'>
            <div
              className={`flex gap-2 content-center flex-wrap items-center xl:mt-45 lg:mt-35 xl:ml-25 lg:ml-15 transition-all duration-600 ease-out delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <svg width='10' height='10' xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="0"
                  y="0"
                  width='10'
                  height='10'
                  rx='10'
                  ry='10'
                  fill={currentTheme.rgb} 
                  style={{
                    filter: `drop-shadow(0 0 4px ${currentTheme.rgb.replace('rgb', 'rgba').replace(')', ', 0.4)')})`,
                    transition: 'all 0.3s ease'
                  }}
                />
              </svg>
              <div className='ibm-plex-sans text-[#e8e8e3] font-extralight'>
                OPEN TO NEW OPPORTUNITIES
              </div>
            </div>

            <div
              className={`xl:ml-30 xl:mt-20 xl:h-20 xl:text-[85px]/20 lg:ml-15 lg:mt-20 lg:h-10 lg:text-[45px]/8 cormorant-garamond font-extralight text-[#e8e8e3] transition-all duration-700 ease-out delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              <div>Do you want to start</div>
              <div>a project together ?</div>
            </div>
            <div className='flex'>
              <div
                className={`xl:ml-30 xl:mt-46 lg:ml-18 lg:mt-30 relative ibm-plex-sans text-[#e8e8e3] text-xl rounded-2xl xl:p-4 lg:p-2 xl:w-80 lg:w-76 border-dashed border-[1.54px] transition-all duration-600 ease-out delay-400 ${currentTheme.lightbg} ${currentTheme.border} ${currentTheme.hoverborder} hover:scale-105 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  backgroundColor: currentTheme.rgbaLight,
                  borderColor: currentTheme.rgb.replace('rgb', 'rgba').replace(')', ', 0.3)'),
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  navigator.clipboard.writeText("ujjwalgoel104@gmail.com");
                  setColor('text-[#e8e8e3]');
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${Grain})`,
                    opacity: 0.04,
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                ></div>
                <div
                  className="relative z-10"

                >
                  UJJWALGOEL104@GMAIL.COM
                </div>

              </div>
              <div className={`${color} text-xl ml-4 mt-50 ibm-plex-sans font-light`}>Copied</div>
            </div>
          </div>

          <div className='h-lvh'>
            <div
              className={`cormorant-garamond text-[#e8e8e3] xl:mt-65 xl:ml-115 xl:text-2xl lg:mt-60 lg:ml-0 lg:text-xl text-right flex flex-col gap-3 transition-all duration-600 ease-out delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              {Content.map((row, i) => (
                <div
                  key={i}
                  className='footer relative cursor-pointer group'
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleNavigation(links[i], i)}
                  style={{
                    opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.15,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    className={`absolute -right-4 top-1/2 transform -translate-y-1/2 w-0 h-0.5 ${currentTheme.bg} transition-all duration-300 ease-out group-hover:w-3`}
                    style={{
                      boxShadow: hoveredIndex === i ? `0 0 8px ${currentTheme.rgb}` : 'none'
                    }}
                  ></div>
                  <span
                    className="transition-colors duration-300"
                    style={{
                      color: hoveredIndex === i ? currentTheme.rgb : '#e8e8e3'
                    }}
                  >
                    {row}
                  </span>
                </div>
              ))}
            </div>

            <div
              className={`ibm-plex-sans font-extralight text-[#e8e8e3] xl:mt-25 xl:w-150 xl:text-xl lg:mt-20 lg:w-140  text-right flex flex-col transition-all duration-1000 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <div>Are you an agency or a</div>
              <div>freelancer? I always welcome new</div>
              <div>opportunities to exchange ideas</div>
              <div>and to explore collaborations</div>
            </div>
            <div
              className={`absolute bottom-10 right-10 transition-all duration-1000 ease-out delay-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
            >
              <div
                className={`w-16 h-1 rounded-full ${currentTheme.bg} ${currentTheme.glowShadow}`}
                style={{
                  transition: 'all 0.3s ease'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LastPage;