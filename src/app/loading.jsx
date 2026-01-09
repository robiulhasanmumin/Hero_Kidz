import Logo from '@/components/layouts/Logo';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      {/* DaisyUI Loading Spinner */}
      <span className="text-5xl font-bold animate-pulse text-primary mb-5">Loading...</span>
      <div className='animate-ping'>

      <Logo></Logo>
      </div>
    </div>
  );
};

export default Loading;