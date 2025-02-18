"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import React from "react";

function FiveDayForecast() {
  const { fiveDayForecast } = useGlobalContext();
  
  const { city, list } = fiveDayForecast;
  
  
  return (
    <div className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">

    </div>
  );
}

export default FiveDayForecast;
