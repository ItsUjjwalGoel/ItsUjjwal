import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Grain from '../assets/Grain.gif';
import Lastpage from './FootNotes.jsx'
import Navbar from './navbar.jsx';
const projects = [
  [
    {
      title: "Currency Converter",
      type: "WEBSITE",
      image: "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "A modern currency conversion tool with real-time exchange rates and elegant UI design",
      themeIndex: 0,
      tech: ["React", "API", "CSS"],
      aboutlink: 'https://github.com/ItsUjjwalGoel/Currency_convertor',
      viewlink: 'https://itsujjwalgoel.github.io/Currency_convertor/'

    },
    {
      title: "E-Commerce Platform",
      type: "WEBSITE",
      image: "https://images.unsplash.com/photo-1643208589889-0735ad7218f0?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "E-commerce Frontend with smooth animation and aesthetic UI",
      themeIndex: 1,
      tech: ["React", "Animation", "UI/UX"],
      aboutlink: 'https://github.com/ItsUjjwalGoel/UClone-Flix',
      viewlink: 'https://itsujjwalgoel.github.io/UClone-Flix/'

    }
  ],
  [
    {
      title: "Task Management",
      type: "WEBSITE",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      description: "Task management platform with real-time updates and local save feature",
      themeIndex: 2,
      tech: ["React", "LocalStorage", "Real-time"],
      aboutlink: 'https://github.com/ItsUjjwalGoel/Basic-Todo',
      viewlink: 'https://basic-todo-gamma.vercel.app/'
    },
    {
      title: "Portfolio Website",
      type: "WEBSITE",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      description: "Creative portfolio showcasing innovative design and development excellence",
      themeIndex: 3,
      tech: ["React", "CSS", "Animation"],
      aboutlink: 'https://github.com/ItsUjjwalGoel/Portfolio',
      viewlink: ''

    }
  ]
];

function Project() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const preventElasticScroll = useCallback((e) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if ((scrollTop === 0 && e.deltaY < 0) || (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const wheelOptions = { passive: false };
    const touchOptions = { passive: false };
    const originalBodyStyle = document.body.style.overscrollBehavior;
    const originalDocumentStyle = document.documentElement.style.overscrollBehavior;

    const handleOnMouseMove = e => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty('--mouse-x', `${x}px`);
      target.style.setProperty('--mouse-y', `${y}px`);
    };

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', handleOnMouseMove);
    });

    document.addEventListener('wheel', preventElasticScroll, wheelOptions);
    document.addEventListener('touchmove', preventElasticScroll, touchOptions);

    return () => {
      document.removeEventListener('wheel', preventElasticScroll, wheelOptions);
      document.removeEventListener('touchmove', preventElasticScroll, touchOptions);
      document.body.style.overscrollBehavior = originalBodyStyle;
      document.documentElement.style.overscrollBehavior = originalDocumentStyle;

      cards.forEach(card => {
        card.removeEventListener('mousemove', handleOnMouseMove);
      });
    };
  }, [preventElasticScroll]);
  const handleViewProjectClick = useCallback((e, i, j) => {
    e.stopPropagation();
    const project = projects[i][j];
    window.open(project.aboutlink, '_blank');
  }, []);

  const handleAboutClick = useCallback((e, i, j) => {
    e.stopPropagation();
    const project = projects[i][j];
    window.open(project.viewlink, '_blank');
  }, []);


  const navigateHome = useCallback(() => {
    window.location.href = '/'
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar firstvalue={'Projects'} secondvalue={'Footnotes'} color={'bg-white/10'} height={'h-34'} margin={'mt-14'} />
      <style jsx>{`
        .project-card {
          --mouse-x: 0px;
          --mouse-y: 0px;
          position: relative;
          background: rgb(29, 29, 29);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(172, 170, 170, 0.1),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .tech-tag {
          border: 1px solid rgba(115, 115, 115, 0.5);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          border-color: rgba(115, 115, 115, 0.8);
        }

        .action-btn {
          background: rgb(29, 29, 29);
          border: 1px solid rgba(115, 115, 115, 0.5);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .action-btn:hover {
          border-color: rgb(1,255,168,0.5);
          transform: translateY(-2px);
        }

        .cormorant-garamond {
          font-family: 'Cormorant Garamond', serif;
        }

        .ibm-plex-sans {
          font-family: 'IBM Plex Sans', sans-serif;
        }
      `}</style>
      <section id='Projects'>
        <div className="flex justify-center w-full pt-16">

          <h2 className="text-gray-100 cormorant-garamond text-7xl font-light">Work</h2>

        </div>

        <div className="mt-20 pb-20">
          {projects.map((row, i) => (
            <div key={i} className="flex mx-auto w-10/12 max-w-6xl mt-10 gap-8 flex-col md:flex-row">
              {row.map((project, j) => (
                <div
                  key={j}
                  className="flex-1 project-card group"
                  onMouseEnter={() => setHoveredCard(`${i}-${j}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    style={{
                      backgroundImage: `url(${Grain})`,
                      opacity: 0.02,
                    }}
                  />

                  <div className="relative w-full h-full z-20 p-6">
                    <div className="w-full h-64 rounded-xl overflow-hidden mb-4">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="cormorant-garamond text-3xl font-light text-gray-100 group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <span className="tech-tag text-gray-300 text-sm px-3 py-1 rounded-lg">
                          {project.type}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="tech-tag text-xs text-gray-300 px-2 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button className="action-btn text-gray-300 text-sm px-4 py-2 rounded-lg ibm-plex-sans font-light"
                          onClick={(e) => handleViewProjectClick(e, i, j)}
                        >
                          View Details
                        </button>
                        <button className="action-btn text-gray-300 text-sm px-4 py-2 rounded-lg ibm-plex-sans font-light"
                          onClick={(e) => handleAboutClick(e, i, j)}>
                          Live Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section >

      <div className="mt-32 mb-16 flex justify-center">
        <div className="h-[0.2px] w-full bg-[rgba(30,31,31)] shadow-[0_0_20px_rgba(1,255,168,0.8)] z-[2]"></div>
      </div>

      <section id='Last Page'>
        < Lastpage />
      </section>
    </div >
  );
}

export default Project;
