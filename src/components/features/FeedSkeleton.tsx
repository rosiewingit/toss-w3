export function FeedSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl bg-white shadow-sm"
        >
          <div className="aspect-[4/3] w-full animate-pulse bg-gray-200" />
          <div className="space-y-2 p-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
