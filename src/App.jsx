import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const Home = lazy(() => import('./Components/Home'));
const Contact = lazy(() => import('./Components/Contact'));
const Info = lazy(() => import('./Components/AboutMe'));
const Projects = lazy(() => import('./Components/Projects'));
const Preloader = lazy(() => import('./Components/Preloader'));


function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('preloaderShown');
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('preloaderShown', 'true');
      }, 4000); 

      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      import('./Components/Home');
    }
  }, [loading]);

  if (loading) return <Preloader />;

  return (
    <Suspense fallback={<div className="text-white text-center pt-20">Loading...</div>}>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AboutMe" element={<Info />} />
        <Route path="/Projects" element={<Projects />} />

      </Routes>
    </Suspense>
  );
}

export default App;
