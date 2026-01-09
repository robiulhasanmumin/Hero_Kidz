export const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Skeleton */}
        <div className="skeleton h-[500px] w-full rounded-3xl"></div>

        {/* Right: Info Skeleton */}
        <div className="space-y-6">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-8 w-1/2"></div>
          
          <div className="flex gap-4">
            <div className="skeleton h-6 w-20"></div>
            <div className="skeleton h-6 w-20"></div>
          </div>

          <div className="skeleton h-24 w-full rounded-2xl"></div>

          <div className="space-y-3 mt-6">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-3/4"></div>
          </div>

          <div className="flex gap-4 pt-10">
            <div className="skeleton h-14 flex-1 rounded-xl"></div>
            <div className="skeleton h-14 flex-1 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};