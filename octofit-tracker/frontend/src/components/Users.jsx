import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Users() {
  const endpointPattern = '-8000.app.github.dev/api/users';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const endpoint = '/api/users/';
        const response = await fetch(`${getApiBaseUrl()}${endpoint}`);

        if (!response.ok) {
          throw new Error('Unable to load users.');
        }

        const payload = await response.json();
        const data = normalizeApiResponse(payload);

        if (active) {
          setUsers(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="h4">Users</h2>
      {users.length === 0 ? (
        <p className="text-muted">No users available yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {users.map((user) => (
            <div className="col" key={user._id || user.id || user.email}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6">{user.name}</h3>
                  <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                  <p className="mb-1"><strong>Age:</strong> {user.age || 'N/A'}</p>
                  <p className="mb-0"><strong>Goal:</strong> {user.fitnessGoal || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
