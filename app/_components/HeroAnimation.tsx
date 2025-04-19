import React, { useEffect, useRef } from 'react';

const HeroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation class after component mounts for entrance effect
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add('animate-in');
      }
    }, 100);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative transition-all duration-1000 ease-out opacity-0 translate-y-8"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="rounded-lg bg-white shadow-xl overflow-hidden relative">
        {/* Document Preview */}
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          {/* App Header */}
          <div className="h-11 bg-white border-b flex items-center px-4">
            <div className="flex space-x-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>
            <div className="mx-auto flex space-x-4">
              <div className="h-6 w-24 bg-gray-100 rounded-md"></div>
              <div className="h-6 w-24 bg-indigo-100 rounded-md"></div>
              <div className="h-6 w-24 bg-gray-100 rounded-md"></div>
            </div>
          </div>

          {/* App Content */}
          <div className="flex h-[calc(100%-2.75rem)]">
            {/* Sidebar */}
            <div className="w-48 border-r bg-gray-50 p-3 flex flex-col">
              <div className="h-7 w-32 bg-indigo-100 rounded-md mb-3"></div>
              {[1, 2, 3, 4, 5].map(num => (
                <div key={num} className="h-6 w-full bg-gray-100 rounded-md mb-2"></div>
              ))}
              <div className="h-6 w-full bg-indigo-200 rounded-md mb-2"></div>
              {[7, 8, 9].map(num => (
                <div key={num} className="h-6 w-full bg-gray-100 rounded-md mb-2"></div>
              ))}
            </div>

            {/* Canvas area */}
            <div className="flex-1 p-4 bg-white">
              <div className="animate-float-slow h-full w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center p-6">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {/* Canvas elements that appear with animation */}
                  <div className="h-20 w-full bg-purple-100 rounded-md animate-fade-in-up" style={{ animationDelay: '0.3s' }}></div>
                  <div className="h-20 w-full bg-blue-100 rounded-md animate-fade-in-up" style={{ animationDelay: '0.5s' }}></div>
                  <div className="h-20 w-full bg-indigo-100 rounded-md animate-fade-in-up" style={{ animationDelay: '0.7s' }}></div>
                  <div className="h-20 w-full bg-pink-100 rounded-md animate-fade-in-up" style={{ animationDelay: '0.9s' }}></div>

                  {/* Connection lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="animate-draw" d="M100,50 C150,50 150,150 200,150" stroke="#818CF8" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
                      <path className="animate-draw" d="M300,50 C250,50 250,150 200,150" stroke="#818CF8" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" style={{ animationDelay: '0.5s' }} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements to add depth */}
        <div className="absolute top-16 -right-6 h-12 w-32 bg-white rounded-lg shadow-lg animate-float"></div>
        <div className="absolute bottom-20 -left-8 h-12 w-44 bg-white rounded-lg shadow-lg animate-float-slow"></div>
      </div>

      {/* Abstracted shapes for visual interest */}
      <div className="absolute -z-10 -top-4 -right-8 h-24 w-24 bg-indigo-100 rounded-full animate-pulse-slow"></div>
      <div className="absolute -z-10 -bottom-6 -left-10 h-32 w-32 bg-purple-50 rounded-full opacity-80 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default HeroAnimation;