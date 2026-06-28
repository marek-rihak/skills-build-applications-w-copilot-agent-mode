import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Workouts() {
  const endpointPattern = '-8000.app.github.dev/api/workouts';
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        const endpoint = '/api/workouts/';
        const response = await fetch(`${getApiBaseUrl()}${endpoint}`);

        if (!response.ok) {
          throw new Error('Unable to load workouts.');
        }

        const payload = await response.json();
        const data = normalizeApiResponse(payload);

        if (active) {
          setWorkouts(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4">Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts available yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {workouts.map((workout) => (
            <div className="col" key={workout._id || workout.id || workout.name}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6">{workout.name}</h3>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                  <p className="mb-1"><strong>Duration:</strong> {workout.duration || 'N/A'}</p>
                  <p className="mb-0"><strong>Focus:</strong> {workout.focus || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
