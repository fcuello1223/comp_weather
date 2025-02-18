"use client";
import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { unixToTime } from "../../utils/miscellaneous";
import { sunset } from "../../utils/icons";

function Sunset() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const sunSet = forecast?.sys?.sunset;
  const sunRise = forecast?.sys?.sunrise;

  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(sunSet, timezone);
  const sunriseTime = unixToTime(sunRise, timezone);

  return (
    <div className="pt-6 px-4 pb-5 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sunset}Sunset</h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>
      <p>Sunrise: {sunriseTime}</p>
    </div>
  );
}

export default Sunset;
