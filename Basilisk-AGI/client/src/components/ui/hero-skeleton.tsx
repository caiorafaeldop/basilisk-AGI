import { Skeleton } from "./skeleton";
import { Card } from "./card";

export const HeroSkeleton = () => {
  return (
    <section className="pt-4 md:pt-32 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>

            <div className="flex justify-center">
              <Skeleton className="h-14 w-64" />
            </div>

            {/* Highlights */}
            <div className="grid gap-4 mt-1">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-5 flex-1" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Image - Hidden on mobile */}
          <div className="relative hidden md:block">
            <Skeleton className="w-full h-[600px] rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
