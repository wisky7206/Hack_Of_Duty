import React, {  useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from '../../assets/herohai.png';
import "./Hero.css";

const NeonButton = ({ text = 'Register Now' }) => {
  return (
    <a href="https://devfolio.co/" target="_blank" rel="noopener noreferrer">
      <button className="px-6 py-3 bg-orange-500 bg-opacity-20 border-2 border-orange-500 rounded-md text-orange-500 text-xl font-semibold relative overflow-hidden group transition-all duration-300 hover:bg-opacity-30 hover:scale-105">
        <span className="relative z-10">{text}</span>
        <div className="absolute inset-0 bg-orange-500 opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
      </button>
    </a>
  );
};

export const Hero = () => {
  const heroRef = useRef(null);

  const animateHero = () => {
    gsap.timeline()
      .from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      .from('.hero-context-left', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      .from('.hero-context-right', {
        x: 100,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut'
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateHero();
          }
        });
      }, 
      { threshold: 0.2 } // Trigger when 20% of the hero section is visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div ref={heroRef} className="parent h-screen flex flex-col crosshair-cursor">
      <div className="hero flex flex-col flex-1 gap-10  h-1/2">
        <div className="hero-title flex flex-col w-full text-5xl">
          <span className='flex ml-8 justify-start'>HACK&nbsp;OF</span>
          <span className="flex mr-2 justify-end">DUTY</span>
        </div>
        <div className="hero-context flex flex-row w-full">
          <div className="hero-context-left flex flex-col gap-2 items-center justify-center text-9xl md:text-[12rem] lg:text-[15rem]">
            <span style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>28-29</span>
            <span style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>OCTOBER</span>
          </div>
          <div className="hero-context-right px-24">
            <NeonButton />
          </div>
        </div>
      </div>
      <img src={Image} alt="Image" className='image absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-full md:w-3/4 lg:w-1/2' />
    </div>
  );
};

export default Hero;
