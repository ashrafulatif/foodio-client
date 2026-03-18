import CategorySection from "@/components/modules/HomePage/CategorySection/CategorySection";
import CategorySkeleton from "@/components/modules/HomePage/CategorySection/CategorySkeleton";
import Hero from "@/components/modules/HomePage/Hero";
import { Suspense } from "react";

const CommonLayoutPage = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<CategorySkeleton />}>
        <CategorySection />
      </Suspense>
    </div>
  );
};

export default CommonLayoutPage;
