import React from 'react';
import { BaseLoaderProps } from './types';
import SkeletonLoader from './SkeletonLoader';
import { Square, Circle, Triangle } from 'lucide-react';


const CanvasLoader: React.FC<BaseLoaderProps> = ({ className = '', color = 'primary' }) => {
  return (
    <div className={`w-full h-full min-h-[300px] p-4 flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
        <div className="absolute top-4 left-4 animate-pulse opacity-30">
          <Square className="text-gray-400" size={32} />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse opacity-30" style={{ animationDelay: '0.2s' }}>
          <Circle className="text-gray-400" size={48} />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-pulse opacity-30" style={{ animationDelay: '0.4s' }}>
          <Triangle className="text-gray-400" size={40} />
        </div>
        
        {/* Animated cursor effect */}
        <div 
          className="absolute w-3 h-3 bg-blue-500 rounded-full" 
          style={{ 
            left: '45%', 
            top: '55%',
            animation: 'cursorMove 3s infinite ease-in-out' 
          }}
        ></div>
        
        <style jsx>{`
          @keyframes cursorMove {
            0% { transform: translate(0, 0); }
            25% { transform: translate(40px, -30px); }
            50% { transform: translate(-60px, 20px); }
            75% { transform: translate(20px, 40px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
      </div>
      
      <div className="w-full max-w-md space-y-2">
        <SkeletonLoader height={12} width="70%" />
        <SkeletonLoader height={12} width="50%" />
        <SkeletonLoader height={12} width="80%" />
      </div>
    </div>
  );
};

export default CanvasLoader;