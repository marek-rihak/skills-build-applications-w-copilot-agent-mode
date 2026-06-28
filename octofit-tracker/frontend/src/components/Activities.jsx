import { useEffect, useState } from 'react';
import { fetchResource } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const data = await fetchResource('activities');
        if (active) {
          setActivities(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4">Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities have been recorded yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {activities.map((activity) => (
            <div className="col" key={activity._id || activity.id || activity.type}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6">{activity.type}</h3>
                  <p className="mb-1"><strong>Duration:</strong> {activity.duration}</p>
                  <p className="mb-1"><strong>Calories:</strong> {activity.calories}</p>
                  <p className="mb-0"><strong>User:</strong> {activity.userId || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activities;
