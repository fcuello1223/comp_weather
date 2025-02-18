"use client";
import React from "react";

import { eye } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/app/context/globalContext";

function Visibility() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { visibility } = forecast;

  const getVisibilityText = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return "Excellent: Clear and vast view";
    if (visibilityInKm > 5) return "Good: Easily navigable";
    if (visibilityInKm > 2) return "Moderate: Some limitations";
    if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
    return "Unavailable: Visibility data not available";
  };

  const visibilityDescription = getVisibilityText(visibility);

  return (
    <div className="pt-6 px-4 pb-5 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} Visibility
        </h2>
        <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} km</p>
      </div>
      <p className="text-sm">{visibilityDescription}</p>
    </div>
  );
}

export default Visibility;
