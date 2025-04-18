"use client";
import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { thermo } from "../../utils/icons";
import { Progress } from "@/components/ui/progress";
import { aqiText } from "../../utils/miscellaneous";

function AirPollution() {
  const { airQuality } = useGlobalContext();

  //Check if airQuality is available and if necessary properties are available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );
  }

  const aqiIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = aqiText.find((item) => {
    return item.rating === aqiIndex;
  });

  return (
    <div className="air-pollution col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}Air Pollution
      </h2>
      <Progress value={aqiIndex} max={100} className="progress" />
      <p>Air Quality is {filteredIndex?.description}</p>
    </div>
  );
}

export default AirPollution;
