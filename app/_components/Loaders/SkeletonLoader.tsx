import { SkeletonLoaderProps } from './types';

/**
 * A skeleton loader component for placeholder content
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  color = 'neutral',
  width = '100%',
  height = '1rem',
  pulse = true,
  borderRadius = '0.25rem',
}) => {
  // Convert numeric values to pixel strings
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;
  
  return (
    <div
      className={`${pulse ? 'animate-pulse' : ''} bg-gray-200 ${className}`}
      style={{
        width: widthValue,
        height: heightValue,
        borderRadius,
      }}
    ></div>
  );
};

export default SkeletonLoader;