"use client";
import React from "react";

import { droplets } from "@/app/utils/icons";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { humidity } = forecast?.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) {
      return "Dry: May Cause Skin Irritation";
    }
    if (humidity >= 30 && humidity < 50) {
      return "Comfortable: Air Moisture Is Ideal For Health & Comfort";
    }
    if (humidity >= 50 && humidity < 70) {
      return "Moderate: Air Is Sticky, May Increase Allergens";
    }
    if (humidity >= 70) {
      return "High: Uncomfortable, May Increase Mold Risk";
    }
    return "Humidity Data Not Available";
  };

  const humidityDescription = getHumidityText(humidity);

  return (
    <div className="pt-6 px-4 pb-5 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} Humidity
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>
      <p className="text-sm">{humidityDescription}</p>
    </div>
  );
}

export default Humidity;
