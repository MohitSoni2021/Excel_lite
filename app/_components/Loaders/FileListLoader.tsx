import React from 'react';
import { BaseLoaderProps } from './types';
import SkeletonLoader from './SkeletonLoader';
import { File } from 'lucide-react';

/**
 * A file list loader with animated placeholder rows
 */
const FileListLoader: React.FC<BaseLoaderProps & { rowCount?: number }> = ({
  className = '',
  color = 'primary',
  rowCount = 5
}) => {
  return (
    <div className={`w-full h-full ${className} pt-5`}>
      
      
      {/* File list */}
      <div className=" px-4">
        {[...Array(rowCount)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center p-3 border border-gray-100 rounded-md" 
            style={{ 
              animationDelay: `${i * 0.1}s`,
              animation: 'fadeIn 0.5s ease-in-out'
            }}
          >
            <div className="mr-3 text-gray-300">
              <File size={20} />
            </div>
            <div className="flex-1">
              <SkeletonLoader width={`${Math.floor(Math.random() * 40) + 40}%`} height={16} className="mb-1" />
              <SkeletonLoader width={`${Math.floor(Math.random() * 30) + 20}%`} height={12} />
            </div>
            <div className="flex space-x-2">
              <SkeletonLoader width={60} height={24} borderRadius="0.25rem" />
              <SkeletonLoader width={24} height={24} borderRadius="0.25rem" />
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FileListLoader;