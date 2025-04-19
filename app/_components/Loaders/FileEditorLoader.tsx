import React from 'react';
import { BaseLoaderProps } from './types';
import SkeletonLoader from './SkeletonLoader';

interface FileEditorLoaderProps extends BaseLoaderProps {
  lineCount?: number;
}

const FileEditorLoader: React.FC<FileEditorLoaderProps> = ({
  className = '',
  color = 'primary',
  lineCount = 15
}) => {
  return (
    <div className={`w-full rounded-lg border border-gray-200 bg-gray-50 ${className}`}>
      {/* Editor header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div className="w-3 h-3 rounded-full bg-gray-300" />
          </div>
          <SkeletonLoader width={120} height={16} />
        </div>
        <div className="flex space-x-2">
          <SkeletonLoader width={60} height={24} borderRadius="0.375rem" />
          <SkeletonLoader width={60} height={24} borderRadius="0.375rem" />
        </div>
      </div>

      {/* Editor content */}
      <div className="p-4 font-mono text-sm flex">
        {/* Line numbers */}
        <div className="select-none text-right pr-4 border-r border-gray-200" style={{ minWidth: '3rem' }}>
          {[...Array(lineCount)].map((_, i) => (
            <div key={i} className="text-gray-400 opacity-50">{i + 1}</div>
          ))}
        </div>

        {/* Code content */}
        <div className="flex-1 pl-4 space-y-2">
          {[...Array(lineCount)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              {/* Indentation */}
              <div style={{ width: `${Math.floor(Math.random() * 3) * 1}rem` }} />
              
              {/* Code segments */}
              <div className="flex items-center space-x-2" style={{ 
                opacity: 0.8,
                animation: `fadeIn 0.5s ease-in-out ${i * 0.05}s`
              }}>
                <SkeletonLoader 
                  width={`${Math.floor(Math.random() * 40 + 20)}%`} 
                  height={16} 
                  className={`${i % 3 === 0 ? 'bg-blue-200/50' : i % 2 === 0 ? 'bg-purple-200/50' : 'bg-amber-200/50'}`}
                />
                {Math.random() > 0.5 && (
                  <SkeletonLoader 
                    width={`${Math.floor(Math.random() * 20 + 10)}%`}
                    height={16}
                    className="bg-gray-200/50"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 0.8; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default FileEditorLoader;