"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const UvProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-3 w-3 rounded-full flex-1 bg-primary shadow-lg shadow-white ring-2 dark:ring-gray-500"
      style={{ marginLeft: `calc(${value}%)` }}
    />
  </ProgressPrimitive.Root>
));
UvProgress.displayName = ProgressPrimitive.Root.displayName;

export { UvProgress };
