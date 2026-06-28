import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Leaderboard() {
  const endpointPattern = '-8000.app.github.dev/api/leaderboard';
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadEntries() {
      try {
        const endpoint = '/api/leaderboard/';
        const response = await fetch(`${getApiBaseUrl()}${endpoint}`);

        if (!response.ok) {
          throw new Error('Unable to load leaderboard.');
        }

        const payload = await response.json();
        const data = normalizeApiResponse(payload);

        if (active) {
          setEntries(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEntries();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4">Leaderboard</h2>
      {entries.length === 0 ? (
        <p className="text-muted">No leaderboard entries yet.</p>
      ) : (
        <ul className="list-group">
          {entries.map((entry, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || `${entry.user}-${index}`}>
              <span>
                <strong>{entry.rank || index + 1}.</strong> {entry.user}
              </span>
              <span className="badge bg-primary rounded-pill">{entry.score}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;
