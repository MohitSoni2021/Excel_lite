import React from 'react';
import { BaseLoaderProps } from './types';
import SkeletonLoader from './SkeletonLoader';


const WorkspaceLoader: React.FC<BaseLoaderProps> = ({ className = '', color = 'primary' }) => {
  return (
    <div className={`w-full h-full min-h-[400px] flex ${className}`}>
      {/* Sidebar skeleton */}
      <div className="hidden sm:flex flex-col w-64 p-4 border-r border-gray-200 space-y-4">
        <div className="flex items-center space-x-2">
          <SkeletonLoader width={32} height={32} borderRadius="0.5rem" />
          <SkeletonLoader width="70%" height={24} />
        </div>
        
        <SkeletonLoader width="90%" height={36} />
        
        <div className="mt-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <SkeletonLoader width={20} height={20} borderRadius="0.25rem" />
              <SkeletonLoader width={`${80 - (i * 5)}%`} height={16} />
            </div>
          ))}
        </div>
        
        <div className="mt-auto">
          <SkeletonLoader width="100%" height={40} borderRadius="0.375rem" />
        </div>
      </div>
      
      {/* Main content skeleton */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="mb-6">
          <SkeletonLoader width="60%" height={32} className="mb-2" />
          <SkeletonLoader width="40%" height={16} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4">
              <SkeletonLoader width="80%" height={20} className="mb-3" />
              <SkeletonLoader width="100%" height={40} className="mb-3" />
              <div className="flex justify-between">
                <SkeletonLoader width={80} height={16} />
                <SkeletonLoader width={60} height={16} />
              </div>
            </div>
          ))}
        </div>
        
        <SkeletonLoader width="100%" height={1} className="my-6" />
        
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-3">
              <SkeletonLoader width={40} height={40} borderRadius="0.375rem" />
              <div className="flex-1 space-y-2">
                <SkeletonLoader width={`${90 - (i * 10)}%`} height={16} />
                <SkeletonLoader width={`${70 - (i * 5)}%`} height={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLoader;