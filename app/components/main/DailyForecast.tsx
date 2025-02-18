"use client";
import React from "react";
import moment from "moment";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/app/utils/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { kelvinToFahrenheit } from "@/app/utils/miscellaneous";

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!forecast || !weather) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  //Filter List for Today's Forecast
  const todayForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );

  const { main: weatherMain } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clouds":
        return cloudy;
      case "Clear":
        return clearSky;
      default:
        return clearSky;
    }
  };

  return (
    <div className="col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="h-full flex gap-10 overflow-hidden">
        {todayForecast.length < 1 ? (
          <div>
            <h1 className="text-[3rem] line-through text-rose-500">
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todayForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                      >
                        <p className="text-gray-300">
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{getIcon()}</p>
                        <p className="mt-4">
                          {kelvinToFahrenheit(forecast.main.temp)}°F
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
