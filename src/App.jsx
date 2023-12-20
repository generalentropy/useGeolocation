import { useGeolocation } from './useGeolocation';
import { useState } from 'react';
const API = import.meta.env;

console.log(API);

const requestHistory = [
  // { time: '02/02/23  23:30' },
  // { time: '05/02/23 21:17' },
  // { time: '02/02/23 12:12' },
  // { time: '02/02/23 13:30' },
  // { time: '02/02/23  23:30' },
  // { time: '05/02/23 21:17' },
  // { time: '02/02/23 12:12' },
  // { time: '02/02/23 13:30' },
];

export default function App() {
  const [history, setHistory] = useState(requestHistory);
  const [countClicks, setCountClicks] = useState(0);

  const {
    isLoading,
    position: { lat, lng },
    error,
    getPos,
  } = useGeolocation();

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPos();
    setHistory([...history, { time: new Date().toLocaleTimeString() }]);
  }

  return (
    <div className="get-position">
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p className="result">
          Your GPS position :
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

      <History history={history} />
    </div>
  );
}

function History({ history }) {
  return (
    <div className="history">
      <span className="title">Requests history :</span>

      {history.map((t) => (
        <li className="time" key={crypto.randomUUID()}>
          {t.time}
        </li>
      ))}
    </div>
  );
}
