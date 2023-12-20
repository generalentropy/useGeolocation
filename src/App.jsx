import { useGeolocation } from "./useGeolocation";
import { useState } from "react";

export default function App() {
  const [countClicks, setCountClicks] = useState(0);

  const { isLoading, position, error, callback } =
    useGeolocation(handleUpdateCounter);

  const { lat, lng } = position;

  function handleUpdateCounter() {
    setCountClicks((count) => count + 1);
  }

  return (
    <div className="get-position">
      <button onClick={callback} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>
        You requested position <strong>{countClicks}</strong> times
      </p>
    </div>
  );
}
