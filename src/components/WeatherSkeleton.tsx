import Container from "./Container";

export default function WeatherSkeleton() {
  return (
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
      {/* Today Data Skeleton */}
      <section className="space-y-4 animate-pulse">
        <div className="space-y-2">
          <h2 className="flex gap-1 text-2xl items-end">
            <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
          </h2>
          <Container className="gap-10 px-6 items-center">
            {/* Temperature Skeleton */}
            <div className="flex flex-col px-4">
              <div className="text-5xl h-12 bg-gray-300 rounded w-20 animate-pulse"></div>
              <p className="text-xs space-x-1 whitespace-nowrap">
                <span className="h-4 bg-gray-300 rounded w-16 animate-pulse"></span>
                <span className="h-4 bg-gray-300 rounded w-12 animate-pulse"></span>
              </p>
              <p className="text-xs space-x-2">
                <span className="h-4 bg-gray-300 rounded w-8 animate-pulse"></span>
                <span className="h-4 bg-gray-300 rounded w-8 animate-pulse"></span>
              </p>
            </div>
            {/* Time and Weather Icon Skeleton */}
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                  <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-8 animate-pulse"></div>
                </div>
              ))}
            </div>
          </Container>
        </div>
        <div className="flex gap-4">
          {/* Left Skeleton */}
          <Container className="w-fit justify-center flex-col px-4 items-center">
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            <div className="h-20 w-20 bg-gray-300 rounded-full animate-pulse"></div>
          </Container>
          <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
            </div>
          </Container>
        </div>
      </section>

      {/* 7 days forecast data Skeleton */}
      <section className="flex w-ful flex-col gap-4">
        <p className="text-2xl h-6 bg-gray-300 rounded w-40 animate-pulse"></p>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md">
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
