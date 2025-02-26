import AirPollution from "./components/main/AirPollution";
import DailyForecast from "./components/main/DailyForecast";
import Navbar from "./components/interface/Navbar";
import Sunset from "./components/main/Sunset";
import Temperature from "./components/main/Temperature";
import Wind from "./components/main/Wind";
import UvIndex from "./components/main/UvIndex";
import Population from "./components/main/Population";
import FeelsLike from "./components/main/FeelsLike";
import Humidity from "./components/main/Humidity";
import Visibility from "./components/main/Visibility";
import Pressure from "./components/main/Pressure";
import Mapbox from "./components/other/Mapbox";
import Image from "next/image";
import FiveDayForecast from "./components/main/FiveDayForecast";

export default function Home() {
  return (
    <main className="mt-[8rem] mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-container mt-4 flex gap-4 h-full w-full">
            <Mapbox />
          </div>
        </div>
      </div>
      <footer className="flex justify-center pb-8 py-4">
        <p className="footer-text text-sm flex items-center gap-1">
          Made By
          <Image src={"/logo-white.svg"} alt="logo" width={20} height={20} />
          <a
            href="http://www.github.com/fcuello1223"
            target="_blank"
            className="text-green-300 font-bold"
          >
            Francisco J. Cuello
          </a>
        </p>
      </footer>
    </main>
  );
}
