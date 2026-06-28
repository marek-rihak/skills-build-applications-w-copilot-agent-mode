import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './api';
import './App.css';

function Home() {
  return (
    <div className="container py-4">
      <h1 className="display-5 fw-semibold">OctoFit Tracker</h1>
      <p className="lead text-muted">
        Monitor users, teams, workouts, activities, and your competitive leaderboard from one place.
      </p>
      <div className="alert alert-info">
        <strong>API base URL:</strong> {getApiBaseUrl()}
      </div>
      <p className="text-muted">
        Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use a Codespaces URL such as
        <code>https://{'{'}your-space{'}'}-8000.app.github.dev</code>.
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">OctoFit</NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
