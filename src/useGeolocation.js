import { useState } from "react";

export function useGeolocation(action) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  //   const { lat, lng } = position;

  function callback() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    if (action) action();

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, callback };
}
