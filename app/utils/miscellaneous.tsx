import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const kelvinToFahrenheit = (kelvin: number): number => {
  const celsius = kelvinToCelsius(kelvin);
  return Math.round((celsius * 9) / 5 + 32);
};

export const metersPerSecondToMph = (mps: number): number => {
  return Math.round(mps * 2.23694);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
}

export const aqiText = [
  {
    rating: 20,
    description: "Good",
  },
  {
    rating: 40,
    description: "Fair",
  },
  {
    rating: 60,
    description: "Moderate",
  },
  {
    rating: 80,
    description: "Poor",
  },
  {
    rating: 100,
    description: "Very Poor",
  },
];
