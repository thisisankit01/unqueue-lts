import React from "react";
import { useState, useEffect } from "react";
import { config } from "dotenv";
config();

export default function MyComponent() {
  const [city, setCity] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = process.env.GMAPS_API_KEY;
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);

      // const city = data.results[0].address_components.find((component) =>
      //   component.types.includes("locality")
      // ).long_name;
      // setCity(city);
    });
  }, []);

  return <div>Current City: {city}</div>;
}
