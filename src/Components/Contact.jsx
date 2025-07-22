import { useState, useEffect, lazy } from 'react';
import emailjs from 'emailjs-com';
import Grain from '../assets/Grain.gif';
import Navbar from './navbar';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_zia1ygm';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_iztl5p6';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'fMac4Vr49ozPkU8XH';
const LastPage = lazy(() => import('./FootNotes.jsx'));
function Contact() {

    const [animationdone, Setanimationdone] = useState(false)
    useEffect(() => {
        Setanimationdone(true);
    })
    useEffect(() => {
        Setanimationdone(true);
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


    const [form, setForm] = useState({
        name: '',
        email: '',
        companyName: '',
        url: '',
        projectInfo: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (PUBLIC_KEY) {
            emailjs.init(PUBLIC_KEY);
            console.log('EmailJS initialized successfully');
        } else {
            console.error('EmailJS public key is not configured');
        }
    }, []);

    useEffect(() => {
        let timeoutId;
        if (status) {
            timeoutId = setTimeout(() => {
                setStatus('');
            }, 2000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [status]);

    useEffect(() => {
        let timeoutId;
        if (Object.keys(formErrors).length > 0) {
            timeoutId = setTimeout(() => {
                setFormErrors({});
            }, 5000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [formErrors]);
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const verifyEmailExists = async (email) => {
        try {
            const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;

            const response = await fetch(
                `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Email verification service unavailable');
            }

            const data = await response.json();


            return {
                isValid: data.deliverability === 'DELIVERABLE' && data.is_smtp_valid?.value !== false,
                deliverability: data.deliverability,
                details: data
            };
        } catch (error) {
            console.error('Email verification failed:', error);
            return { isValid: true, error: error.message };
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (name === 'email') {
            if (!value) {
                setEmailError('');
                return;
            }

            if (!validateEmail(value)) {
                setEmailError('Please enter a valid email address');
                return;
            }
            setIsVerifyingEmail(true);
            setEmailError('');
            const timeoutId = setTimeout(async () => {
                const verification = await verifyEmailExists(value);

                if (verification.error) {
                    setEmailError('Unable to verify email. Please double-check your address.');
                } else if (!verification.isValid) {
                    setEmailError('This email address does not exist or is not deliverable');
                } else {
                    setEmailError('');
                }

                setIsVerifyingEmail(false);
            }, 1000);

            if (window.emailVerificationTimeout) {
                clearTimeout(window.emailVerificationTimeout);
            }
            window.emailVerificationTimeout = timeoutId;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors({});
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setFormErrors({
                config: 'EmailJS is not properly configured. Please check your environment variables.'
            });
            console.error('Missing EmailJS configuration:', {
                SERVICE_ID: !!SERVICE_ID,
                TEMPLATE_ID: !!TEMPLATE_ID,
                PUBLIC_KEY: !!PUBLIC_KEY
            });
            return;
        }

        const errors = {};

        if (form.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters.';
        }

        if (!form.email) {
            errors.email = 'Email is required.';
        } else if (!validateEmail(form.email)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (!form.companyName) {
            errors.companyName = 'Company name is required.';
        }

        if (!form.url) {
            errors.url = 'Company URL / GitHub URL is required.';
        }

        if (isVerifyingEmail) {
            errors.email = 'Please wait while we verify your email address.';
        }
        if (emailError) {
            errors.email = emailError;
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);
        setStatus('');

        emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                from_name: form.name,
                from_email: form.email,
                company_name: form.companyName,
                company_url: form.url,
                project_info: form.projectInfo,
                message: form.message
            },
            PUBLIC_KEY
        )
            .then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setStatus('SUCCESS');
                    setForm({
                        name: '',
                        email: '',
                        companyName: '',
                        url: '',
                        projectInfo: '',
                        message: ''
                    });
                    setIsSubmitting(false);
                },
                (error) => {
                    console.error('FAILED...', error);
                    setStatus('FAILED');
                    setIsSubmitting(false);
                }
            );
    };

    const alphaKeyFilter = (e) => {
        const allowedKeys = [
            "Backspace",
            "Tab",
            "Enter",
            "ArrowLeft",
            "ArrowRight",
            "Delete",
            " ",
        ];
        if (
            (!/^[a-zA-Z]$/.test(e.key)) &&
            !allowedKeys.includes(e.key)
        ) {
            e.preventDefault();
        }
    };

    const pasteFilter = (e) => {
        const pastedText = e.clipboardData.getData("Text");
        if (/[^a-zA-Z ]/.test(pastedText)) {
            e.preventDefault();
        }
    };

    return (
        <div className='bg-black w-screen xl:h-565 lg:h-450  overflow-hidden inset-0' style={{ overscrollBehaviorY: 'none', overscrollBehavior: 'contain' }}>
            <div className='w-full bg-black xl:h-350 lg:h-250 overflow-hidden'>
                <Navbar firstvalue={'Contact Us'} secondvalue={'Footnotes'} color={'bg-white/10'} height={'h-34'} margin={'mt-14'} />
                <section id='Contact Us'>
                    <div className={` xl:text-[270px] lg:text-[150px] absolute z-0 tracking-wide transition-all duration-1000  font-extralight viaoda-libre-regular  w-full h-lvh text-center xl:pt-18 lg:pt-0 text-[#e8e8e3]
                 ${animationdone ? 'translate-y-10' : 'translate-y-0'}`}


                    >Contact</div>
                    <div className='w-full h-full flex justify-center '>
                        <div className={` w-11/12 h-160 bg-[rgb(255,255,255,0.1)]  transition-all duration-1000  z-1 absolute xl:mt-98 lg:mt-46   ${animationdone ? 'translate-y-0' : 'translate-y-10'}`}
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}>
                        </div>
                        <div className={`w-11/12 h-160 z-2 absolute xl:mt-98 lg:mt-46  transition-all duration-1000   ${animationdone ? 'translate-y-0' : 'translate-y-10'}`} style={{
                            backgroundImage: `url(${Grain})`,
                            opacity: '0.034'
                        }}></div>
                        <div className='w-11/12 h-160 z-3 absolute xl:mt-98 lg:mt-46 flex' >
                            <div className='w-3/7 pl-10 pt-12'>
                                <div className='ibm-plex-sans xl:text-xl lg:text-lg font-extralight text-[#e8e8e3]'>
                                    <div>LET'S GET IN TOUCH AND SEE IF WE'RE A GOOD FIT FOR  </div>
                                    <div> THE PROJECT YOU HAVE IN MIND </div>
                                </div>
                                <div
                                    className={`flex gap-2 content-center flex-wrap items-center xl:mt-45 lg:mt-30 ml-4  transition-all duration-600 ease-out delay-100 `}>
                                    <svg width='10' height='10' xmlns="http://www.w3.org/2000/svg">
                                        <rect
                                            x="0"
                                            y="0"
                                            width='10'
                                            height='10'
                                            rx='10'
                                            ry='10'
                                            fill='rgb(1,255,168)'
                                            style={{
                                                filter: `drop-shadow(0 0 4px 'rgb(1,255,168,0.4)))`,
                                                transition: 'all 0.3s ease'
                                            }}
                                        />
                                    </svg>
                                    <div className='ibm-plex-sans text-[18px]  text-[#e8e8e3] font-extralight'>
                                        OPEN TO NEW OPPORTUNITIES
                                    </div>
                                </div>
                                <div className='ibm-plex-sans mt-45 xl:text-6xl lg:text-5xl text-[#e8e8e3] font-light'>Get in touch</div>

                                {status === 'SUCCESS' && (
                                    <div className="mt-8 p-4 bg-green-900/30 border border-green-500 rounded-lg transition-opacity duration-300">
                                        <p className="text-green-400 ibm-plex-sans font-extralight">Email sent successfully! I'll get back to you soon.</p>
                                    </div>
                                )}
                                {status === 'FAILED' && (
                                    <div className="mt-8 p-4 bg-red-900/30 border border-red-500 rounded-lg transition-opacity duration-300">
                                        <p className="text-red-400 ibm-plex-sans font-extralight">Failed to send email. Please try again later.</p>
                                    </div>
                                )}
                                {formErrors.config && (
                                    <div className="mt-8 p-4 bg-red-900/30 border border-red-500 rounded-lg transition-opacity duration-300">
                                        <p className="text-red-400 ibm-plex-sans font-extralight">{formErrors.config}</p>
                                    </div>
                                )}
                            </div>
                            <div className='w-4/7 h-full '>
                                <form onSubmit={handleSubmit}>
                                    <div className='flex '>
                                        <div className="xl:pt-12 xl:pl-30 lg:pt-10 lg:pl-10 relative">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name"
                                                value={form.name}
                                                onChange={handleChange}
                                                className={`peer text-[#e8e8e3] py-1 xl:w-70 lg:w-50 ibm-plex-sans text-xl rounded-[6px] font-extralight transition-all duration-300 border border-transparent hover:border-gray-500 hover:pl-4 focus:border-[rgb(1,255,168)] focus:outline-none focus:pl-4 bg-transparent ${formErrors.name ? 'border-red-500' : ''}`}
                                                required
                                                onKeyDown={alphaKeyFilter}
                                                onPaste={pasteFilter}
                                            />
                                            <div
                                                className={`absolute h-[1px] bg-gray-500  xl:w-70 lg:w-50  transition-colors  duration-100  peer-hover:bg-transparent  peer-focus:bg-transparent ${formErrors.name ? 'bg-red-500' : ''}`}
                                            ></div>
                                            {formErrors.name && (
                                                <div className="absolute -bottom-6 left-30 text-red-400 text-sm ibm-plex-sans font-extralight">
                                                    {formErrors.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="xl:pt-12 xl:pl-12 lg:pt-10 lg:pl-10 relative">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className={`peer text-[#e8e8e3] py-1 xl:w-70 lg:w-50 ibm-plex-sans text-xl rounded-[6px] font-extralight transition-all duration-300 border border-transparent hover:border-gray-500 hover:pl-4 focus:border-[rgb(1,255,168)] focus:outline-none focus:pl-4 bg-transparent ${emailError || formErrors.email ? 'border-red-500' : ''}`}
                                                required
                                                minLength={5}
                                                maxLength={254}
                                                autoComplete="email"
                                            />
                                            <div
                                                className={`absolute h-[1px] bg-gray-500  xl:w-70 lg:w-50  transition-colors  duration-100  peer-hover:bg-transparent  peer-focus:bg-transparent ${emailError || formErrors.email ? 'bg-red-500' : ''}`}
                                            ></div>
                                            {isVerifyingEmail && (
                                                <div className="absolute -bottom-6 left-0 text-blue-400 text-sm ibm-plex-sans font-extralight flex items-center">
                                                    <svg className="animate-spin ml-12 mr-2 h-3 w-3 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Verifying email...
                                                </div>
                                            )}
                                            {(emailError || formErrors.email) && !isVerifyingEmail && (
                                                <div className="absolute -bottom-9 left-12 text-red-400 text-sm ibm-plex-sans font-extralight">
                                                    {emailError || formErrors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex '>
                                        <div className="pt-12 xl:pl-30 lg:pl-12 relative">
                                            <input
                                                type="text"
                                                name="companyName"
                                                placeholder="Company Name"
                                                value={form.companyName}
                                                onChange={handleChange}
                                                required
                                                onKeyDown={alphaKeyFilter}
                                                onPaste={pasteFilter}
                                                className={`peer text-[#e8e8e3] py-1  xl:w-70 lg:w-50 ibm-plex-sans text-xl rounded-[6px] font-extralight transition-all duration-300 border border-transparent hover:border-gray-500 hover:pl-4 focus:border-[rgb(1,255,168)] focus:outline-none focus:pl-4 bg-transparent ${formErrors.companyName ? 'border-red-500' : ''}`}
                                            />
                                            <div
                                                className={`absolute h-[1px] bg-gray-500  xl:w-70 lg:w-50  transition-colors  duration-100  peer-hover:bg-transparent  peer-focus:bg-transparent ${formErrors.companyName ? 'bg-red-500' : ''}`}
                                            ></div>
                                            {formErrors.companyName && (
                                                <div className="absolute -bottom-6 left-30 text-red-400 text-sm ibm-plex-sans font-extralight">
                                                    {formErrors.companyName}
                                                </div>
                                            )}
                                        </div>
                                        <div className="pt-12 xl:pl-12 lg:pl-10 relative">
                                            <input
                                                type="url"
                                                name="url"
                                                placeholder="Company URL / GitHub URL"
                                                value={form.url}
                                                onChange={handleChange}
                                                className={`peer text-[#e8e8e3] py-1 xl:w-70 lg:w-50 ibm-plex-sans text-xl rounded-[6px] font-extralight transition-all duration-300 border border-transparent hover:border-gray-500 hover:pl-4 focus:border-[rgb(1,255,168)] focus:outline-none focus:pl-4 bg-transparent ${formErrors.url ? 'border-red-500' : ''}`}
                                                required
                                                minLength={10}
                                                maxLength={2048}
                                                autoComplete="url"
                                            />
                                            <div
                                                className={`absolute h-[1px] bg-gray-500 xl:w-70 lg:w-50   transition-colors  duration-100  peer-hover:bg-transparent  peer-focus:bg-transparent ${formErrors.url ? 'bg-red-500' : ''}`}
                                            ></div>
                                            {formErrors.url && (
                                                <div className="absolute -bottom-6 left-12 text-red-400 text-sm ibm-plex-sans font-extralight">
                                                    {formErrors.url}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="pt-10 xl:pl-30 lg:pl-12 relative">
                                        <textarea
                                            name="projectInfo"
                                            placeholder="Info about your project"
                                            value={form.projectInfo}
                                            onChange={handleChange}
                                            className="peer text-[#e8e8e3] py-3 h-30 xl:w-153 lg:w-110 ibm-plex-sans text-xl rounded-[6px] font-extralight transition-all duration-300 border border-transparent hover:border-gray-500 hover:pl-4 focus:border-[rgb(1,255,168)] focus:outline-none focus:pl-4 resize-none bg-transparent"
                                        ></textarea>
                                        <div
                                            className="absolute h-[1px] bg-gray-500 xl:w-153 lg:w-110 transition-colors duration-100 peer-hover:bg-transparent peer-focus:bg-transparent"
                                        ></div>
                                    </div>
                                    <div className="pt-10 xl:pl-30 lg:pl-12 relative">
                                        <textarea
                                            name="message"
                                            placeholder="Query / Message"
                                            value={form.message}
                                            onChange={handleChange}
                                            className="peer text-[#e8e8e3] py-3 h-30  xl:w-153 lg:w-110 ibm-plex-sans text-xl rounded-[6px] font-extralight transition-all duration-300 border border-transparent hover:border-gray-500 hover:pl-4 focus:border-[rgb(1,255,168)] focus:outline-none focus:pl-4 resize-none bg-transparent"
                                        ></textarea>
                                        <div
                                            className="absolute h-[1px] bg-gray-500 xl:w-153 lg:w-110 transition-colors duration-100 peer-hover:bg-transparent peer-focus:bg-transparent"
                                        ></div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className='xl:ml-30 lg:ml-12 mt-12 px-4 py-1 bg-transparent border-gray-500 border-1 text-xl ibm-plex-sans font-extralight text-[#e8e8e3] rounded-[5px] hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        {isSubmitting ? 'Sending...' : 'Submit'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
            <div className="relative w-full h-8 overflow-visible z-10">
                <div
                    className="absolute top-4 h-[0.41px] w-full bg-[rgba(30,31,31)] shadow-[0_0_20px_rgba(1,255,168,0.8)]"
                ></div>
            </div>

            <section className='Footnotes'>
                <LastPage />
            </section>
        </div >
    )
}

export default Contact