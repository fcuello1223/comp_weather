"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async () => {
    try {
      const response = await axios.get("/api/weather");
      setForecast(response.data);
    } catch (error) {
      console.log("Error Fetching Forecast Data", error.message);
    }
  };

  const fetchAirQuality = async () => {
    try {
      const response = await axios.get("/api/pollution");
      setAirQuality(response.data);
    } catch (error) {
      console.log("Error Fetching Air Quality Data", error.message);
    }
  };

  const fetchFiveDayForecast = async () => {
    try {
      const response = await axios.get("/api/five-day-forecast");
      setFiveDayForecast(response.data);
    } catch (error) {
      console.log("Error Fetching Five Day Forecast", error.message);
    }
  };

  const fetchUvIndex = async () => {
    try {
      const response = await axios.get("/api/uv-index");
      setUvIndex(response.data);
    } catch (error) {
      console.log("Error Fetching UV Index", error.message);
    }
  }

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
    fetchUvIndex();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        setForecast,
        airQuality,
        setAirQuality,
        fiveDayForecast,
        setFiveDayForecast,
        uvIndex,
        setUvIndex
      }}
    >
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
