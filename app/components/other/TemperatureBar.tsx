const getTemperatureGradient = (low: number, high: number) => {
  const colorStops = [
    { temp: -20, color: "#000000" }, // Black (Extreme Cold)
    { temp: -10, color: "#4B0082" }, // Dark Purple
    { temp: -5, color: "#6A0DAD" }, // Deep Purple
    { temp: 0, color: "#8A2BE2" }, // Purple
    { temp: 5, color: "#483D8B" }, // Darker Blue-Purple
    { temp: 10, color: "#191970" }, // Midnight Blue
    { temp: 15, color: "#00008B" }, // Dark Blue
    { temp: 20, color: "#0000CD" }, // Medium Blue
    { temp: 25, color: "#4169E1" }, // Royal Blue
    { temp: 30, color: "#1E90FF" }, // Light Blue
    { temp: 35, color: "#87CEFA" }, // Sky Blue
    { temp: 40, color: "#00BFFF" }, // Deep Sky Blue
    { temp: 45, color: "#4682B4" }, // Steel Blue
    { temp: 50, color: "#32CD32" }, // Green (Cool)
    { temp: 55, color: "#3CB371" }, // Medium Sea Green
    { temp: 60, color: "#ADFF2F" }, // Green-Yellow
    { temp: 65, color: "#FFD700" }, // Gold
    { temp: 70, color: "#FFA500" }, // Orange
    { temp: 75, color: "#FF8C00" }, // Dark Orange
    { temp: 80, color: "#FF4500" }, // Orange-Red
    { temp: 85, color: "#FF0000" }, // Red
    { temp: 90, color: "#DC143C" }, // Crimson
    { temp: 95, color: "#B22222" }, // Firebrick
    { temp: 100, color: "#8B0000" }, // Dark Red
    { temp: 105, color: "#800000" }, // Maroon
    { temp: 110, color: "#FF6347" }, // Tomato
    { temp: 115, color: "#FF7F50" }, // Coral
    { temp: 120, color: "#FFFFFF" }, // White (Extreme Heat)
  ];

  // Filter only relevant colors for the given temperature range
  const filteredColors = colorStops.filter(
    (stop) => stop.temp >= low && stop.temp <= high
  );

  // If range is too small, include closest colors
  if (filteredColors.length < 2) {
    const closestLow =
      colorStops.find((stop) => stop.temp <= low) || colorStops[0];
    const closestHigh =
      colorStops.find((stop) => stop.temp >= high) ||
      colorStops[colorStops.length - 1];
    filteredColors.unshift(closestLow);
    filteredColors.push(closestHigh);
  }

  // Normalize temperatures within the given range
  const normalizeTemp = (temp: number) => ((temp - low) / (high - low)) * 100;

  const gradientColors = filteredColors
    .map(({ temp, color }) => `${color} ${normalizeTemp(temp)}%`)
    .join(", ");

  return {
    background: `linear-gradient(to right, ${gradientColors})`,
  };
};

const TemperatureBar = ({ low, high }: { low: number; high: number }) => {
  return (
    <div
      className="w-full h-2 rounded-full mt-2"
      style={getTemperatureGradient(low, high)}
    ></div>
  );
};

export default TemperatureBar;
