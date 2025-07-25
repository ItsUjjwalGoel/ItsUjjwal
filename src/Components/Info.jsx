import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../Context/ThemeContext';
function AboutMe() {
    const [isLoaded, setIsLoaded] = useState(false);
    const sectionRef = useRef(null);
    const { currentTheme } = useTheme();
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isLoaded) {
                        setTimeout(() => {
                            setIsLoaded(true);
                        }, 150);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [isLoaded]);

    return (
        <section id='About Me'>
            <div className='min-h-screen bg-black transition-all duration-1000 ease-out' ref={sectionRef}>
                <div className={`text-[#e8e8e3] pt-28 pb-16 font-serif text-6xl text-center transform transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    About
                </div>
                <div className='max-w-4xl mx-auto px-8'>
                    <div className='flex justify-center'>
                        <div className='w-full'>
                            <div className={`transform transition-all duration-900 ease-out delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                                <div className='text-[#e8e8e3] space-y-6 text-xl leading-relaxed font-light text-center max-w-3xl mx-auto'>
                                    <p>
                                        I'm Ujjwal — a developer driven by curiosity and a deep
                                        desire to understand how systems work. My journey into tech wasn't planned — it started with exploration and
                                        grew into a passion for clean logic and problem solving.
                                    </p>

                                    <p>
                                        I prefer learning by doing experimenting, iterating, and refining. I enjoy both the quiet focus of solo work
                                        and the collaborative energy of a team.
                                    </p>

                                    <p>
                                        Outside of code, I find clarity in music. Playing the piano helps me think, reflect, and sometimes even debug
                                        in my head.
                                    </p>
                                </div>
                                <div className={`mt-16 flex justify-center transform transition-all duration-1000 ease-out delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                    <button className={`px-8 py-3 border border-gray-600 ${currentTheme.hoverborder} text-gray-300 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${currentTheme.hovershadow}`}
                                        onClick={() => window.location.href = '/AboutMe'}>
                                        Explore More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-32 mb-16'>
                    <div
                        className={`h-[0.41px] relative z-3 w-full bg-[rgba(30,31,31)] ${currentTheme.glowShadow}`}
                    ></div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;