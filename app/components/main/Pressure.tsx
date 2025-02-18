"use client";
import React from "react";

import { gauge } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/app/context/globalContext";

function Pressure() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { pressure } = forecast?.main;

  const getPressureText = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure";

    if (pressure >= 1040) return "Very high pressure";

    return "Unavailable pressure data";
  };

  const pressureDescription = getPressureText(pressure);

  return (
    <div className="pt-6 px-4 pb-5 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Air Pressure
        </h2>
        <p className="pt-4 text-2xl">{pressure} mb</p>
      </div>
      <p className="text-sm">{pressureDescription}</p>
    </div>
  );
}

export default Pressure;
