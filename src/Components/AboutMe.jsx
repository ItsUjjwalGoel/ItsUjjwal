import { useEffect, useRef, lazy, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Grain from '../assets/Grain.gif'
import myimg from '../assets/Ujjwal.jpg'
import './AboutMe.css'
import Navbar from './navbar.jsx'
const Lastpage = lazy(() => import('./FootNotes.jsx'))

gsap.registerPlugin(ScrollTrigger)

function Info() {
    const journeyTitleRef = useRef(null)
    const journeyLinesRef = useRef([])
    const aboutTitleRef = useRef(null)
    const animationContextRef = useRef(null)

    const preventElasticScroll = useCallback((e) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop === 0 && e.deltaY < 0) {
            e.preventDefault()
        }

        if (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0) {
            e.preventDefault()
        }
    }, [])

    const addToRefs = useCallback((el) => {
        if (el && !journeyLinesRef.current.includes(el)) {
            journeyLinesRef.current.push(el)
        }
    }, [])

    const navigateHome = useCallback(() => {
        window.location.href = '/'
    }, [])

    useEffect(() => {
        animationContextRef.current = gsap.context(() => {
            if (journeyLinesRef.current.length > 0) {
                journeyLinesRef.current.forEach(line => {
                    if (line) gsap.set(line, { opacity: 1 })
                })
            }

            if (journeyTitleRef.current) {
                gsap.set(journeyTitleRef.current, { opacity: 1 })
            }

            const createScrollTrigger = (element, config = {}) => {
                return ScrollTrigger.create({
                    trigger: element,
                    start: "top 30%",
                    end: "top 20%",
                    onEnter: () => {
                        gsap.to(element, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        })
                    },
                    onLeaveBack: () => {
                        gsap.to(element, {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        })
                    },
                    ...config
                })
            }

            journeyLinesRef.current.forEach((line) => {
                if (line) createScrollTrigger(line)
            })

            if (journeyTitleRef.current) {
                createScrollTrigger(journeyTitleRef.current)
            }
        })

        const wheelOptions = { passive: false }
        const touchOptions = { passive: false }

        document.addEventListener('wheel', preventElasticScroll, wheelOptions)
        document.addEventListener('touchmove', preventElasticScroll, touchOptions)

        const originalBodyStyle = document.body.style.overscrollBehavior
        const originalDocumentStyle = document.documentElement.style.overscrollBehavior

        document.body.style.overscrollBehavior = 'none'
        document.documentElement.style.overscrollBehavior = 'none'

        return () => {
            document.removeEventListener('wheel', preventElasticScroll, wheelOptions)
            document.removeEventListener('touchmove', preventElasticScroll, touchOptions)

            document.body.style.overscrollBehavior = originalBodyStyle
            document.documentElement.style.overscrollBehavior = originalDocumentStyle

            if (animationContextRef.current) {
                animationContextRef.current.revert()
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [preventElasticScroll])

    const GridLines = () => (
        <div className='fixed z-1 xl:gap-65 gap-45 flex w-11/12 justify-center overflow-hidden'>
            {Array.from({ length: 6 }, (_, i) => (
                <div
                    key={i}
                    className='w-[2px] h-lvh bg-gradient-to-t from-[rgba(255,255,255,0.1)] to-[rgba(40,40,40,0.1)]'
                />
            ))}
        </div>
    )

    const ExternalLink = ({ href, children, className = '' }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            ref={addToRefs}
            className={`text-[#e8e8e3] text-xl ibm-plex-sans hover:text-white transition-colors duration-200 cursor-pointer relative group inline-block ${className}`}
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-full"></span>
        </a>
    )

    return (
        <div className='bg-black'>
            <div className='h-1400 w-screen bg-black overflow-hidden'>
                <div className='w-full fixed h-full flex justify-center overflow-hidden'>
                    <GridLines />
                </div>
                <Navbar firstvalue={'About Ujjwal'} forthvalue={'Tech Stack'} thirdvalue={'Achievements'} secondvalue={'Experience'} fifthvalue={'Links'} height={'h-74'} color={`bg-white/10`} sixthvalue={'Footnotes'} margin={'mt-14'} />
                <div className='fixed top-0 left-0 w-screen h-lvh overflow-hidden'>
                    <div className='w-full h-10 mt-0 flex justify-center'>
                        <h1
                            ref={aboutTitleRef}
                            className='text-center text-[#e8e8e3] xl:text-[200px] text-[150px] absolute z-0 tracking-wide font-extralight viaoda-libre-regular'
                        >
                            About Ujjwal
                        </h1>
                    </div>
                </div>
                <main className='absolute top-0 left-0 w-screen h-lvh'>
                    <section id='About Ujjwal'>
                        <div className='w-full h-10 mt-120'></div>

                        <div className='w-full flex justify-center'>
                            <div className='w-65 rounded-[5px] pl-1 h-93 p-1 transition-all text-sm duration-500 -rotate-4 bg-white hover:-rotate-3'>
                                <img src={myimg} className='object-cover w-65 h-86' alt="Ujjwal Goel" />
                                Ujjwal Goel
                            </div>
                        </div>

                        <div className='flex'>
                            <div ref={addToRefs} className='xl:ml-78 ml-48 mt-42 text-[#e8e8e3] text-xl ibm-plex-sans'>Info</div>
                            <div ref={addToRefs} className='xl:ml-70 ml-48 mt-40 z-0'>
                                <div className='text-[42px] text-[#e8e8e3] ibm-plex-sans'>My Journey in </div>
                                <div className='text-[42px] -mt-1 text-[#e8e8e3] viaoda-libre-regular'>Tech</div>
                            </div>
                        </div>

                        <div className='xl:ml-159 ml-109 mt-10'>
                            {[
                                "I'm Ujjwal — a developer driven by ",
                                "curiosity and a deep desire to ",
                                "understand how systems work.",
                                "My journey into tech wasn't planned",
                                "it started with exploration and grew into",
                                "a passion for clean logic",
                                "and problem solving.",
                                "",
                                "I enjoy both the quiet focus of solo work",
                                "and the collaborative energy of a team.",
                                "",
                                "Outside of code, I find clarity in music.",
                                "Playing the piano helps me think, reflect",
                                ", and sometimes even debug in my head."
                            ].map((line, index) => (
                                line === "" ? <br key={index} /> : (
                                    <div key={index} ref={addToRefs} className='text-xl ibm-plex-sans text-[#e8e8e3]'>
                                        {line}
                                    </div>
                                )
                            ))}
                        </div>
                    </section>

                    <section id='Experience'>
                        <div className='flex'>
                            <div ref={addToRefs} className='xl:ml-140 ml-90 mt-105  text-xl text-[#e8e8e3] ibm-plex-sans'>Work</div>
                            <div ref={addToRefs} className='mt-100 xl:ml-71 ml-51 z-0 text-[#e8e8e3] text-[42px] viaoda-libre-regular'>Experience</div>
                        </div>
                        <div ref={addToRefs} className='xl:ml-225 ml-155 mt-5 text-[#e8e8e3] text-xl ibm-plex-sans'>Software Engineer @ Festbuzz</div>
                    </section>

                    <section id='Achievements'>
                        <div className='flex'>
                            <div ref={addToRefs} className='xl:ml-18 ml-10 mt-109 text-xl text-[#e8e8e3] ibm-plex-sans'>:)</div>
                            <div ref={addToRefs} className='mt-105 xl:ml-71 ml-48 z-0 text-[#e8e8e3] text-[42px] viaoda-libre-regular'>Achievements</div>
                        </div>
                        <div ref={addToRefs} className='xl:ml-94 ml-63 mt-5 text-[#e8e8e3] text-xl ibm-plex-sans'>TCS CodeVita Season 12 803 Rank</div>
                        <div ref={addToRefs} className='xl:ml-94 ml-63  mt-2 text-[#e8e8e3] text-xl ibm-plex-sans'>ATL Marathon, ISRO 2022 12th Rank</div>
                    </section>

                    <ExternalLink href="https://leetcode.com/u/POAANddjT0/" className='xl:ml-94 ml-63 '>
                        LeetCode
                    </ExternalLink>
                    <br />
                    <ExternalLink href="https://github.com/ItsUjjwalGoel" className='xl:ml-94 ml-63 '>
                        GitHub
                    </ExternalLink>
                    <br />
                    <section id='Tech Stack'>
                        <ExternalLink href="https://codeforces.com/profile/ujjwalgoel104" className='xl:ml-94 ml-63 '>
                            Codeforces
                        </ExternalLink>
                        <div ref={addToRefs} className='mt-105 xl:ml-194 ml-124 text-[#e8e8e3] text-xl ibm-plex-sans'>Apart from </div>
                        <div ref={addToRefs} className='mt-0 xl:ml-184 ml-114 text-[#e8e8e3] text-xl ibm-plex-sans'>English & Hindi</div>
                        <div ref={addToRefs} className='-mt-20 xl:ml-288 ml-196 text-[#e8e8e3] xl:text-[42px] text-[30px] ibm-plex-sans'>Languages &</div>
                        <div ref={addToRefs} className='-mt-3 xl:ml-288  ml-196 text-[#e8e8e3] xl:text-[42px] text-[30px] viaoda-libre-regular'>Tools</div>

                        {['Python', 'SQL', 'C++', 'Javascript', 'Git', 'Docker', 'Firebase'].map((tech, index) => (
                            <div key={tech} ref={addToRefs} className={`xl:ml-291 ml-198     ${index === 0 ? 'mt-5' : ''} text-[#e8e8e3] text-xl ibm-plex-sans`}>
                                {tech}
                            </div>
                        ))}

                        <div ref={addToRefs} className='mt-90 xl:ml-7 ml-41 text-[#e8e8e3] text-xl ibm-plex-sans'>import</div>
                        <div ref={addToRefs} className='-mt-12 xl:ml-92 ml-105 text-[#e8e8e3] text-[42px] ibm-plex-sans'>Frameworks</div>
                        <div ref={addToRefs} className='-mt-3 xl:ml-92 ml-105  text-[#e8e8e3] text-[42px] viaoda-libre-regular'>& Libraries</div>

                        {['Next.js', 'React', 'Node.js', 'Framer Motion', 'Tailwind', 'Gsap'].map((framework, index) => (
                            <div key={framework} ref={addToRefs} className={`xl:ml-95 ml-108 ${index === 0 ? 'mt-5' : ''} text-[#e8e8e3] text-xl ibm-plex-sans`}>
                                {framework}
                            </div>
                        ))}
                    </section>


                    <section id='Links'>
                        <div ref={addToRefs} className='mt-150 xl:ml-77 ml-91 text-[#e8e8e3] text-xl ibm-plex-sans'>^_^</div>
                        <div ref={addToRefs} className='-mt-12 xl:ml-157 ml-152 text-[#e8e8e3] text-[42px] ibm-plex-sans'>Core CS</div>
                        <div ref={addToRefs} className='-mt-3 xl:ml-157 ml-152 text-[#e8e8e3] text-[42px] viaoda-libre-regular'>Concepts</div>

                        {['DSA', 'DBMS', 'OOP', 'Operating System'].map((concept, index) => (
                            <div key={concept} ref={addToRefs} className={`xl:ml-160 ml-155 ${index === 0 ? 'mt-5' : ''} text-[#e8e8e3] text-xl ibm-plex-sans`}>
                                {concept}
                            </div>
                        ))}


                        <div ref={addToRefs} className='mt-100 xl:ml-205 ml-45 text-[#e8e8e3] text-xl ibm-plex-sans'>Links</div>
                        <div ref={addToRefs} className='-mt-12 xl:ml-288 ml-105 text-[#e8e8e3] text-[42px] ibm-plex-sans'>Let's Connect</div>

                        <ExternalLink href="https://leetcode.com/u/POAANddjT0/" className='xl:ml-291 ml-108 mt-2'>
                            LeetCode
                        </ExternalLink>
                        <br />
                        <ExternalLink href="https://github.com/ItsUjjwalGoel" className='xl:ml-291 ml-108 mt-2'>
                            GitHub
                        </ExternalLink>
                        <br />
                        <ExternalLink href="https://codeforces.com/profile/ujjwalgoel104" className='xl:ml-291 ml-108 mt-2'>
                            Codeforces
                        </ExternalLink>
                        <ExternalLink href="https://www.linkedin.com/in/its-ujjwal/" className='xl:ml-291 ml-108 mt-2'>
                            Linkedin
                        </ExternalLink>
                    </section>
                </main>
            </div>
            <div
                className="h-[0.41px] mt-30 relative z-50 w-full bg-[rgba(30,31,31)]"
                style={{
                    boxShadow: '0 0 20px rgba(1, 255, 168, 0.6)'
                }}
            >
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        boxShadow: '0 0 40px rgba(1, 255, 168, 0.4), 0 0 80px rgba(1, 255, 168, 0.2)'
                    }}
                />
            </div>
            <section id='Last Page'>
                <Lastpage />
            </section>
        </div>
    )
}

export default Info