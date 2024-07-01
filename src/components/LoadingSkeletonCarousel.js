import React from "react";

const LoadingSkeletonCarousel = () => {
  return (
    <div className="flex space-x-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="min-w-[200px] animate-pulse">
          <div className="h-48 bg-gray-800 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-700 rounded mb-2"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeletonCarousel;
