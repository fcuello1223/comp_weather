"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";

import { kelvinToFahrenheit } from "@/app/utils/miscellaneous";
import { useGlobalContext } from "../../context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/icons";

function Temperature() {
  const { forecast } = useGlobalContext();
  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const [currentDay, setCurrentDay] = useState("");
  const [localTime, setLocalTime] = useState("");

  const temp = kelvinToFahrenheit(main?.temp);
  const minTemp = kelvinToFahrenheit(main?.temp_min);
  const maxTemp = kelvinToFahrenheit(main?.temp_max);

  const { main: weatherMain, description } = weather[0];

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

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format("h:mm:ss A");
      const day = localMoment.format("dddd");
      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="pt-6 px-4 pb-5 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <p className="flex items-center justify-between">
        <span className="font-medium ">{currentDay}</span>
        <span className="font-medium ">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°F</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium ">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>
            Low: <strong>{minTemp}°F</strong>
          </span>
          <span>
            High: <strong>{maxTemp}°F</strong>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
