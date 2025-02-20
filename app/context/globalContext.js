"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import defaultStates from "../utils/defaultCities";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [geocodedList, setGeocodedList] = useState(defaultStates || []);
  const [inputVal, setInputVal] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([40.7128, -74.006]);

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
      setForecast(response.data);
    } catch (error) {
      console.log("Error Fetching Forecast Data", error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const response = await axios.get(`/api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(response.data);
    } catch (error) {
      console.log("Error Fetching Air Quality Data", error.message);
    }
  };

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `/api/five-day-forecast?lat=${lat}&lon=${lon}`
      );
      setFiveDayForecast(response.data);
    } catch (error) {
      console.log("Error Fetching Five Day Forecast", error.message);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const response = await axios.get(`/api/uv-index?lat=${lat}&lon=${lon}`);
      setUvIndex(response.data);
    } catch (error) {
      console.log("Error Fetching UV Index", error.message);
    }
  };

  const fetchGeocodedList = async (search) => {
    try {
      const response = await axios.get(`/api/geocoded?search=${search}`);
      setGeocodedList(response.data);
    } catch (error) {
      console.log("Error Fetching Geocoded List: ", error.message);
    }
  };

  const handleInput = (event) => {
    setInputVal(event.target.value);

    if (event.target.value === "") {
      setGeocodedList(defaultStates);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeocodedList(search);
    }, 500);

    if (inputVal) {
      debouncedFetch(inputVal);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputVal]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  console.log(geocodedList);

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
        setUvIndex,
        geocodedList,
        setGeocodedList,
        inputVal,
        setInputVal,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
