import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

import { useContext, useEffect } from 'react';
import LoginContext from '../contexts/LoginContext';

function HomePage() {
  const { setState } = useContext(LoginContext);
  useEffect(() => {
    setState('login');
  }, [setState]);
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default HomePage;