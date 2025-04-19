export interface BaseLoaderProps {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
  }
  
  export interface SpinnerLoaderProps extends BaseLoaderProps {
    speed?: number;
  }
  
  export interface SkeletonLoaderProps extends BaseLoaderProps {
    pulse?: boolean;
    width?: string | number;
    height?: string | number;
    borderRadius?: string;
  }