import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const home = lazy(() => import('./Components/Home'));
const contact = lazy(() => import('./Components/Contact'));
const info = lazy(() => import('./Components/AboutMe'));
const projects = lazy(() => import('./Components/Projects'));
const preloader = lazy(() => import('./Components/Preloader'));


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

  if (loading) return <preloader />;

  return (
    <Suspense fallback={<div className="text-white text-center pt-20">Loading...</div>}>
      <Routes>
      
        <Route path="/" element={<home />} />
        <Route path="/Contact" element={<contact />} />
        <Route path="/AboutMe" element={<info />} />
        <Route path="/Projects" element={<projects />} />

      </Routes>
    </Suspense>
  );
}

export default App;
