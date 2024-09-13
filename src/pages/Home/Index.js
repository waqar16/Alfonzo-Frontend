import React from 'react';
import HeroSection from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import Services from '../../components/Services/Services';
import BlogSection from '../../components/Blog/Blogs';
import Testimonials from '../../components/Testimonials/Testimonials';
import Contact from '../../components/Contact/Contact';


function Index() {
  return (
    <div className="App">
      <HeroSection />
      <Features /> 
      <Services />
      <BlogSection />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default Index;
