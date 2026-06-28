"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
const startServer = async () => {
    try {
        await (0, database_1.connectToDatabase)();
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};
app.get('/api', (_req, res) => {
    res.json({ message: 'OctoFit Tracker API', apiUrl: baseUrl, endpoints: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'] });
});
app.get(['/api/health', '/api/health/'], (_req, res) => {
    res.json({ status: 'ok', apiUrl: baseUrl, database: 'mongodb://127.0.0.1:27017/octofit_db' });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const data = await user_1.User.find({});
    res.json({ apiUrl: baseUrl, data });
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const newUser = await user_1.User.create(req.body);
    res.status(201).json(newUser);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const data = await team_1.Team.find({});
    res.json({ apiUrl: baseUrl, data });
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const newTeam = await team_1.Team.create(req.body);
    res.status(201).json(newTeam);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const data = await activity_1.Activity.find({});
    res.json({ apiUrl: baseUrl, data });
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const newActivity = await activity_1.Activity.create(req.body);
    res.status(201).json(newActivity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const data = await leaderboard_1.Leaderboard.find({});
    res.json({ apiUrl: baseUrl, data });
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const newEntry = await leaderboard_1.Leaderboard.create(req.body);
    res.status(201).json(newEntry);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const data = await workout_1.Workout.find({});
    res.json({ apiUrl: baseUrl, data });
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const newWorkout = await workout_1.Workout.create(req.body);
    res.status(201).json(newWorkout);
});
startServer();
