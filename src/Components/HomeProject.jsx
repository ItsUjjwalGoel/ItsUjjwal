
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../Context/ThemeContext.jsx'; 
import Grain from '../assets/Grain.gif';

function Projects() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [width, setWidth] = useState(14);
  const [height, setHeight] = useState(14);
  const [bg, setBg] = useState('rgb(1, 255, 168)');
  const [isHovered, setIsHovered] = useState(false);
  const [top, setTop] = useState(7.5);
  const [border, setBorder] = useState(0);
  const [borderradius, setBoderradius] = useState(10);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const { currentTheme, setThemeByIndex } = useTheme();
  const projects = useMemo(() => [
    {
      title: "Currency Converter",
      type: "WEBSITE",
      image: "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "A modern currency conversion tool with real-time exchange rates and elegant UI design",
      themeIndex: 0,
      aboutlink: 'https://github.com/ItsUjjwalGoel/Currency_convertor',
      viewlink: 'https://itsujjwalgoel.github.io/Currency_convertor/'
    },
    {
      title: "E-Commerce Platform",
      type: "WEBSITE",
      image: "https://images.unsplash.com/photo-1643208589889-0735ad7218f0?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "E-commerce Frontend with smooth animation and aesthetic ui",
      themeIndex: 1, 
      aboutlink: 'https://github.com/ItsUjjwalGoel/UClone-Flix',
      viewlink: 'https://itsujjwalgoel.github.io/UClone-Flix/'
    },
    {
      title: "Task Management",
      type: "WEBSITE",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      description: "Task management platform with real-time updates Local Save feature",
      themeIndex: 2, 
      aboutlink: 'https://github.com/ItsUjjwalGoel/Basic-Todo',
      viewlink: 'https://basic-todo-gamma.vercel.app/'
    },
    {
      title: "Portfolio Website",
      type: "WEBSITE",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      description: "Creative portfolio showcasing innovative design and development excellence",
      themeIndex: 3,
      aboutlink: 'https://github.com/ItsUjjwalGoel/Portfolio',
      viewlink: ''
    }
  ], []);

  const handlemousein = useCallback(() => {
    setIsHovered(true);
    setBg(currentTheme.rgbaLight);
    setWidth(176);
    setHeight(30);
    setTop(0);
    setBorder(1);
    setBoderradius(7);
  }, [currentTheme]);

  const handlemouseout = useCallback(() => {
    setIsHovered(false);
    setBg(currentTheme.rgb);
    setWidth(14);
    setHeight(14);
    setTop(7.5);
    setBorder(0);
    setBoderradius(10);
  }, [currentTheme]);
  useEffect(() => {
    const newThemeIndex = projects[currentSection].themeIndex;
    setThemeByIndex(newThemeIndex);

    if (!isHovered) {
      setBg(currentTheme.rgb);
    }
  }, [currentSection, projects, isHovered, setThemeByIndex, currentTheme.rgb]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          requestAnimationFrame(() => {
            setIsVisible(true);
            setHasAnimated(true);
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px'
      }
    );

    const currentSectionElement = sectionRef.current;
    if (currentSectionElement) {
      observer.observe(currentSectionElement);
    }

    return () => {
      if (currentSectionElement) {
        observer.unobserve(currentSectionElement);
      }
    };
  }, [hasAnimated]);

  const handleSectionClick = useCallback(() => {
    setCurrentSection((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      handleSectionClick();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentSection((prev) => (prev - 1 + projects.length) % projects.length);
    }
  }, [handleSectionClick, projects.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
  const currentProject = useMemo(() => projects[currentSection], [projects, currentSection]);

  const handleAboutClick = useCallback((e) => {
    e.stopPropagation();
    window.open(currentProject.aboutlink, '_blank');
  }, [currentProject]);

  const handleViewProjectClick = useCallback((e) => {
    e.stopPropagation();
    window.open(currentProject.viewlink, '_blank');
  }, [currentProject]);

  return (
    <section id='Projects'>
      <div className="bg-[#e8e8e3] min-h-screen">
        <div
          ref={sectionRef}
          className="bg-black text-[#e8e8e3] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute inset-0 bg-black"></div>

          <div className="relative z-10">
            <div className={`transform transition-all duration-1200 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <h1
                className="text-6xl md:text-7xl text-center font-light pt-20 pl-10 mb-10 bg-gradient-to-r from-[#e8e8e3] via-white to-indigo-200 bg-clip-text text-transparent"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  textShadow: '0 0 30px rgba(255,255,255,0.1)',
                  willChange: 'transform' 
                }}
              >
                Projects
              </h1>
            </div>

            <div className="flex justify-center px-4">
              <div
                className={`card h-180 w-332 max-w-full rounded-3xl bg-gradient-to-br from-gray-900 to-black text-[#e8e8e3] relative overflow-hidden cursor-pointer mb-12 group shadow-2xl border border-gray-800/50 backdrop-blur-sm transform transition-all duration-1000 ease-out ${currentTheme.hovershadow} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{
                  transitionDelay: isVisible ? '300ms' : '0ms',
                  willChange: 'transform' 
                }}
                onClick={handleSectionClick}
              >
                <div
                  className="absolute inset-0 transition-all duration-1000 ease-out rounded-3xl"
                  style={{
                    backgroundImage: `url(${currentProject.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3,
                    willChange: 'opacity' 
                  }}
                />
                <div
                  className="absolute top-0 right-0 w-screen h-screen"
                  style={{
                    position: 'fixed',
                    backgroundImage: `url(${Grain})`,
                    backgroundBlendMode: 'overlay',
                    opacity: 0.035,
                    zIndex: 1,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    transformOrigin: 'right',
                    willChange: 'transform'
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/70 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60 rounded-3xl"></div>

                <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                  <div className="flex justify-between items-start w-full">
                    <div></div>
                    <div className={`bg-black/40 backdrop-blur-md border ${currentTheme.border} px-3 py-2 rounded-xl opacity-90 shadow-lg ${currentTheme.hoverborder} transition-all duration-300`}>
                      <span className="font-light text-[#e8e8e3]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        {currentProject.type}
                      </span>
                    </div>
                  </div>

                  <div className="mt-85 flex-1 flex items-center">
                    <div className="text-left w-full">
                      <h2
                        className="text-5xl md:text-6xl font-light mb-4 transition-all duration-700 ease-out transform bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          textShadow: '0 0 30px rgba(255,255,255,0.1)',
                          willChange: 'transform'
                        }}
                        key={currentProject.title}
                      >
                        {currentProject.title}
                      </h2>
                      <p
                        className="text-lg md:text-xl opacity-90 font-light max-w-2xl transition-all duration-700 ease-out leading-relaxed text-[#e8e8e3]"
                        style={{
                          fontFamily: 'IBM Plex Sans, sans-serif',
                          willChange: 'opacity'
                        }}
                        key={currentProject.description}
                      >
                        {currentProject.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-10 mt-8">
                    <div className="flex gap-2">
                      {projects.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-500 ${index === currentSection
                            ? `w-12 ${currentTheme.bg} ${currentTheme.glowShadow}`
                            : 'w-8 bg-gray-600 opacity-50 hover:opacity-75'
                            }`}
                          style={{ willChange: 'width, background-color' }}
                        />
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        className={`${currentTheme.lightbg} backdrop-blur-md border ${currentTheme.border} px-4 py-2 rounded-xl opacity-80 hover:bg-[rgba(31,31,31,0.1)] hover:opacity-100 ${currentTheme.hoverborder} transition-all duration-300 transform hover:scale-105`}
                        onClick={handleAboutClick}
                        style={{ willChange: 'transform' }} 
                      >
                        <span className="text-sm font-medium" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}

                        >
                          About
                        </span>
                      </button>
                      <button
                        className={`${currentTheme.lightbg} backdrop-blur-md border ${currentTheme.border} px-4 py-2 rounded-xl opacity-90 hover:bg-[rgba(31,31,31,0.1)] ${currentTheme.hoverborder} transition-all duration-300 transform hover:scale-105`}
                        onClick={handleViewProjectClick}
                        style={{ willChange: 'transform' }}
                      >
                        <span className="font-light text-[#e8e8e3]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                          View Project
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-60">
                    <p className="text-xs font-light animate-pulse" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      Tap anywhere or use arrow keys to navigate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative w-27 m-auto pb-20 transform transition-all duration-1200 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{
                transitionDelay: isVisible ? '600ms' : '0ms',
                willChange: 'transform' 
              }}
            >
              <div
                className="relative w-40 m-auto group"
                onMouseEnter={handlemousein}
                onMouseLeave={handlemouseout}
              >
                <div className="absolute -left-5" style={{ top: `${top}px` }}>
                  <svg
                    width={width}
                    height={height}
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                    style={{
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: 'none',
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
                      style={{
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        pointerEvents: 'none',
                      }}
                    />
                  </svg>
                </div>

                <div
                  className="z-1 text-xl font-extralight text-[#e8e8e3] mb-10 cursor-pointer transition-all duration-300 group-hover:transform group-hover:translate-x-1"
                  style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    willChange: 'transform'
                  }}
                  onClick={() => {
                    window.location.href = '/Projects'
                  }}
                >
                  See More Work
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`h-[0.41px] relative z-3 w-full bg-[rgba(30,31,31)] ${currentTheme.glowShadow}`}
        ></div>
      </div>
    </section>
  );
}

export default Projects;
