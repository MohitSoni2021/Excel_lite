import React, { useEffect, useRef } from 'react';
import HeroAnimation from './HeroAnimation';
import { Button } from '@/components/ui/button';
import { Pyramid } from 'lucide-react';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs';

const HeroComponent: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);
    
    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-1/3 h-1/3 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-1/3 h-1/3 bg-purple-50 rounded-full opacity-50 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto w-full z-10 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left side - Text Content */}
          <div className="flex flex-col animate-on-scroll opacity-0 transition-all duration-1000 delay-100 translate-y-8">
            <div className="flex items-center mb-6">
              <Pyramid className="h-8 w-8 text-indigo-600 animate-pulse" />
              <h3 className="ml-2 text-xl font-semibold text-gray-800">Prisma</h3>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Where <span className="text-indigo-600">Documents</span> and <span className="text-purple-600">Visualization</span> Unite
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Create, collaborate and visualize your ideas seamlessly. Transform your thoughts into visual masterpieces with our intuitive canvas and document tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <RegisterLink>
              <button 
                className="px-8 py-4 text-base sm:text-lg font-medium bg-blue-500 cursor-pointer text-white rounded-lg"
              >
                Get Started for Free
              </button>
              </RegisterLink>
              
              <button 
                className="px-8 py-4 text-base sm:text-lg font-medium bg-stone-800 cursor-pointer text-white rounded-lg"
              >
                See How It Works
              </button>
            </div>
            
            <div className="mt-12 flex items-center">
              <div className="flex -space-x-2">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img 
                  src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  Trusted by <span className="font-medium text-indigo-600">50,000+</span> users
                </p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-sm">★</span>
                  ))}
                  <span className="ml-1 text-sm text-gray-600">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Animation/Image */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 delay-300 translate-y-8">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;