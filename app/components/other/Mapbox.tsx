"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";

//@ts-ignore
function FlyToActiveCity({ activeCityCoords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCoords) {
      const zoomLevel = 15;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo(
        [activeCityCoords.lat, activeCityCoords.lon],
        zoomLevel,
        flyToOptions
      );
    }
  }, [activeCityCoords, map]);

  return null;
}

function Mapbox() {
  const { forecast } = useGlobalContext();

  const activeCityCoordinates = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCoordinates) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={[activeCityCoordinates.lat, activeCityCoordinates.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
        className="rounded-lg m-4 relative z-[1]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FlyToActiveCity activeCityCoords={activeCityCoordinates} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;
