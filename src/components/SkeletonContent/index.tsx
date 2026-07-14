import { Card, Skeleton } from "@heroui/react";
import { type FC } from 'react';

const SkeletonContent: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4.5 w-40 rounded-lg" />
                <Skeleton className="h-6 w-15 rounded-lg" />
              </div>
              <div className="flex items-center gap-1 flex-wrap mt-1.5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-5 w-10 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-28 w-full rounded-lg" />
              ))}
            </div>
            <Skeleton key={index} className="h-27 w-full rounded-lg" />
            <Skeleton key={index} className="h-10 w-full rounded-full" />
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-5 w-25 rounded-lg" />
                ))}
              </div>
              <Skeleton key={index} className="h-30 w-full rounded-lg" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
export default SkeletonContent;