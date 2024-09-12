import './App.css';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header/Navbar';
import HeroSection from './components/Hero/Hero';
import Features from './components/Features/Features';
import Services from './components/Services/Services';
import BlogSection from './components/Blog/Blogs';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="App">
      <Header />
      <HeroSection />
      <Features /> 
      <Services />
      <BlogSection />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
