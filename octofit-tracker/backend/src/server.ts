import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', apiUrl: baseUrl, endpoints: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'] });
});

app.get(['/api/health', '/api/health/'], (_req, res) => {
  res.json({ status: 'ok', apiUrl: baseUrl, database: mongoUri });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const data = await User.find({});
  res.json({ apiUrl: baseUrl, data });
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const data = await Team.find({});
  res.json({ apiUrl: baseUrl, data });
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const newTeam = await Team.create(req.body);
  res.status(201).json(newTeam);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const data = await Activity.find({});
  res.json({ apiUrl: baseUrl, data });
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const newActivity = await Activity.create(req.body);
  res.status(201).json(newActivity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const data = await Leaderboard.find({});
  res.json({ apiUrl: baseUrl, data });
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  const newEntry = await Leaderboard.create(req.body);
  res.status(201).json(newEntry);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const data = await Workout.find({});
  res.json({ apiUrl: baseUrl, data });
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const newWorkout = await Workout.create(req.body);
  res.status(201).json(newWorkout);
});

startServer();
