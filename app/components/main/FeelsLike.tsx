"use client";
import React from "react";

import { useGlobalContext } from "@/app/context/globalContext";
import { thermometer } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { kelvinToFahrenheit } from "@/app/utils/miscellaneous";

function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemp: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemp + maxTemp) / 2;
    if (feelsLike < avgTemp - 10) {
      return "It Feels Significantly Colder Than The Actual Air Temperature";
    }
    if (feelsLike > avgTemp - 10 && feelsLike <= avgTemp + 10) {
      return "It Feels Colder Than The Actual Air Temperature";
    }
    if (feelsLike > avgTemp + 10) {
      return "It Feels Significantly Warmer Than The Actual Air Temperature";
    }
    if (feelsLike < avgTemp + 10 && feelsLike >= avgTemp - 10) {
      return "It Feels Warmer Than The Actual Air Temperature";
    }
    return "Temperature Feels Like The Actual Air Temperature";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 px-4 pb-5 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{kelvinToFahrenheit(feels_like)}°F</p>
      </div>
      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}

export default FeelsLike;
