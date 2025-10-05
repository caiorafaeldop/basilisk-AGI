import { Skeleton } from "./skeleton";
import { Card } from "./card";

export const AboutSkeleton = () => {
  return (
    <section className="py-6 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image - Desktop only */}
          <div className="relative hidden lg:block">
            <Card className="overflow-hidden border-0">
              <Skeleton className="w-full aspect-square" />
            </Card>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Mobile Image */}
            <div className="block lg:hidden">
              <Card className="overflow-hidden border-0">
                <Skeleton className="w-full aspect-square" />
              </Card>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Qualifications */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <Skeleton className="h-5 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
