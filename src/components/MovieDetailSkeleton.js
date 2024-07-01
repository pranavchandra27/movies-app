import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieDetailSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#2D2D2D" highlightColor="#444">
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="relative mb-8">
            <Skeleton height={400} width="100%" />
          </div>
          <div className="mb-8">
            <Skeleton height={40} width="60%" />
            <Skeleton height={20} width="80%" className="mt-4" />
            <Skeleton height={20} width="80%" className="mt-2" />
            <Skeleton height={20} width="80%" className="mt-2" />
          </div>
          <div className="mb-8">
            <Skeleton height={30} width="40%" />
            <Skeleton height={20} width="60%" className="mt-4" />
            <Skeleton height={20} width="60%" className="mt-2" />
            <Skeleton height={20} width="60%" className="mt-2" />
            <Skeleton height={20} width="60%" className="mt-2" />
          </div>
          <div className="mb-8">
            <Skeleton height={30} width="40%" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton height={200} width="100%" />
                  <Skeleton height={20} width="80%" className="mt-2" />
                  <Skeleton height={15} width="60%" className="mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieDetailSkeleton;
