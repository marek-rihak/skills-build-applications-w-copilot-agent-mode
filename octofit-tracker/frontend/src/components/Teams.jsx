import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTeams() {
      try {
        const endpoint = '/api/teams/';
        const response = await fetch(`${getApiBaseUrl()}${endpoint}`);

        if (!response.ok) {
          throw new Error('Unable to load teams.');
        }

        const payload = await response.json();
        const data = normalizeApiResponse(payload);

        if (active) {
          setTeams(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4">Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams available yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {teams.map((team) => (
            <div className="col" key={team._id || team.id || team.name}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6">{team.name}</h3>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                  <p className="mb-1"><strong>City:</strong> {team.city || 'N/A'}</p>
                  <p className="mb-0"><strong>Members:</strong> {team.members?.join(', ') || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
