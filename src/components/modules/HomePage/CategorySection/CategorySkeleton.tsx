const CategorySkeleton = () => (
  <section className="w-full max-w-360 mx-auto px-6 py-16">
    <div className="text-center mb-10">
      <div className="h-12 w-64 bg-secondary rounded-lg mx-auto animate-pulse mb-3" />
      <div className="h-5 w-80 bg-secondary rounded mx-auto animate-pulse" />
    </div>
    <div className="flex items-center justify-center gap-4 mb-16">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="w-53.75 py-6 rounded-tl-[20px] rounded-br-[20px] bg-secondary animate-pulse h-[130px]"
        />
      ))}
    </div>
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 pt-10">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="w-[300px] h-[400px] bg-secondary rounded-tl-[34px] rounded-br-[34px] animate-pulse"
        />
      ))}
    </div>
  </section>
);

export default CategorySkeleton;
