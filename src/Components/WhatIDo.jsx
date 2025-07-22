import React from 'react';
function WhatIDo({ setCardRef, setContainerRef }) {
    return (
        <section id='What I Do'>
            <div className="min-h-screen bg-[#e8e8e3] rounded-t-4xl relative">

                <div className='w-full px-8 m-auto text-[#171717]'>
                    <div className='outfit xl:text-9xl lg:text-8xl font-medium py-14'>WHAT I DO /</div>
                    <div className='flex'>
                        <div className='xl:w-200 lg:w-140 ibm-plex-sans'>
                            <div className='text-right pt-8 text-[#525151]'>(Services)</div>
                        </div>
                        <div className='text-justify xl:pl-10 lg:pl-5 lg:pr-5  xl:pr-30 mt-8 ibm-plex-sans xl:text-xl'>
                            <div>I specialize in building full-stack web applications</div>
                            <div>that are fast, reliable, and user-friendly. With a</div>
                            <div>solid foundation in both frontend and backend</div>
                            <div>technologies, I help bring ideas to life whether</div>
                            <div>it's for a business, a startup, or a product team.</div>
                        </div>
                    </div>
                </div>
                <div
                    ref={setContainerRef}
                    className='relative w-full h-[100vh] bg-[#e8e8e3] overflow-hidden'
                >
                    <div
                        ref={setCardRef(0)}
                        className='absolute top-0 left-0 w-full h-[465px] px-8 bg-[#e8e8e3] flex flex-col justify-center'
                        style={{ zIndex: 1 }}
                    >
                        <div className='bg-[#aba9a9] w-350 m-auto h-[1.2px] '></div>
                        <div className='text-black flex justify-between'>
                            <div className='text-6xl outfit font-medium px-5'>(01)</div>
                            <div className='text-6xl outfit font-medium xl:pr-50 lg:pr-40'>Full-Stack Development</div>
                        </div>
                        <div className='xl:w-205 lg:w-190 ml-auto mt-10 text-justify ibm-plex-sans text-xl text-black'>
                            <div>From frontend interactions to backend APIs, I</div>
                            <div>build complete web solutions. I work with</div>
                            <div>modern stacks to deliver apps that are scalable,</div>
                            <div>maintainable, and ready for real-world users.</div>
                        </div>
                        <div className='w-205 ml-auto mt-10'>
                            <div className='flex text-black content-center flex-wrap items-center'>
                                <div className='monoton-regular text-xl h-10 pt-2 mr-6'>01</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>Next.js ,React.js , Node.js, Express.js</div>
                                <div className='bg-[#c7c6c6] w-350 m-auto h-[2px] mt-4 mb-7'></div>
                            </div>
                            <div className='flex text-black content-center flex-wrap'>
                                <div className='monoton-regular text-xl pt-2 mr-6'>02</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>FastApi ,REST APIs, Firebase, Docker</div>
                                <div className='bg-[#c7c6c6] w-350 m-auto h-[2px] mt-4 mb-7'></div>
                            </div>
                            <div className='flex text-black content-center flex-wrap'>
                                <div className='monoton-regular text-xl pt-2 mr-6'>03</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>Git, GitHub</div>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={setCardRef(1)}
                        className='absolute top-0 left-0 w-full h-[465px] px-8 bg-[#e8e8e3] flex flex-col justify-center'
                        style={{ zIndex: 2 }}
                    >
                        <div className='bg-[#aba9a9] w-350 m-auto h-[1.2px] '></div>
                        <div className='text-black flex justify-between'>
                            <div className='text-6xl outfit font-medium px-5'>(02)</div>
                            <div className='text-6xl outfit font-medium xl:pr-92 lg:pr-82'>UI/UX & Frontend</div>
                        </div>

                        <div className='xl:w-205 lg:w-190 ml-auto mt-10 text-justify ibm-plex-sans text-xl text-black'>
                            <div>Design is more than looks — it's about clarity and</div>
                            <div>connection. I design and develop clean, responsive</div>
                            <div>interfaces that feel intuitive across devices. My focus is</div>
                            <div>on clarity, accessibility, and seamless user experiences.</div>
                        </div>

                        <div className='w-205 ml-auto mt-10'>
                            <div className='flex text-black content-center flex-wrap items-center'>
                                <div className='monoton-regular text-xl h-10 pt-2 mr-6'>01</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>TailwindCSS, GSAP</div>
                                <div className='bg-[#c7c6c6] w-350 m-auto h-[2px] mb-7 mt-4'></div>
                            </div>
                            <div className='flex text-black content-center flex-wrap'>
                                <div className='monoton-regular text-xl pt-2 mr-6'>02</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>Figma to Code</div>
                                <div className='bg-[#c7c6c6] w-350 m-auto h-[2px] mb-7 mt-4'></div>
                            </div>
                            <div className='flex text-black content-center flex-wrap'>
                                <div className='monoton-regular text-xl pt-2 mr-6'>03</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>HTML, CSS, JavaScript</div>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={setCardRef(2)}
                        className='absolute top-0 left-0 w-full h-[465px] px-8 bg-[#e8e8e3] flex flex-col justify-center'
                        style={{ zIndex: 3 }}
                    >
                        <div className='bg-[#aba9a9] w-350 m-auto h-[2px] '></div>
                        <div className='text-black flex justify-between'>
                            <div className='text-6xl outfit font-medium px-5'>(03)</div>
                            <div className='text-6xl outfit font-medium xl:pr-122 lg:pr-113'>Optimization</div>
                        </div>
                        <div className='xl:w-205 lg:w-190  ml-auto mt-10 text-justify ibm-plex-sans text-xl text-black'>
                            <div>Beyond handling data, I'm driven by the challenge of</div>
                            <div>turning complex raw inputs into reliable, usable systems.</div>
                            <div>I enjoy designing pipelines that power insights and apply</div>
                            <div>core CS principles to build for scale, speed, and stability.</div>
                        </div>
                        <div className='w-205 ml-auto mt-10'>
                            <div className='flex text-black content-center flex-wrap items-center'>
                                <div className='monoton-regular text-xl h-10 pt-2 mr-6'>01</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>Data Structures & Algorithms</div>
                                <div className='bg-[#c7c6c6] w-350 m-auto h-[2px] mb-7 mt-4'></div>
                            </div>
                            <div className='flex text-black content-center flex-wrap'>
                                <div className='monoton-regular text-xl pt-2 mr-6'>02</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>DBMS, OOPs</div>
                                <div className='bg-[#c7c6c6] w-350 m-auto h-[2px] mb-7 mt-4'></div>
                            </div>
                            <div className='flex text-black content-center flex-wrap'>
                                <div className='monoton-regular text-xl pt-2 mr-6'>03</div>
                                <div className='ibm-plex-sans text-4xl font-medium'>OS Fundamentals</div>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={setCardRef(3)}
                        className='absolute top-0 left-0 w-full h-[15px] px-8 bg-[transparent] flex flex-col justify-center'
                        style={{ zIndex: 4 }}
                    >

                    </div>
                </div>

            </div>
        </section>
    );
}

export default WhatIDo;