import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-800 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-700 rounded mb-2"></div>
      <div className="h-6 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export default LoadingSkeleton;
