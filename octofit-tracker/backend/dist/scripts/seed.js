"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data
async function seedDatabase() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
        { name: 'Ava Patel', email: 'ava@example.com', age: 29, fitnessGoal: 'Improve endurance' },
        { name: 'Liam Chen', email: 'liam@example.com', age: 34, fitnessGoal: 'Build strength' },
    ]);
    const teams = await team_1.Team.insertMany([
        { name: 'Peak Performers', sport: 'CrossFit', city: 'Seattle', members: [users[0].name, users[1].name] },
        { name: 'Trail Blazers', sport: 'Running', city: 'Denver', members: [users[0].name] },
    ]);
    await activity_1.Activity.insertMany([
        { type: 'Run', duration: '45m', calories: 520, userId: users[0]._id.toString() },
        { type: 'Strength', duration: '60m', calories: 410, userId: users[1]._id.toString() },
    ]);
    await leaderboard_1.Leaderboard.insertMany([
        { user: users[0].name, score: 1420, rank: 1 },
        { user: users[1].name, score: 1280, rank: 2 },
    ]);
    await workout_1.Workout.insertMany([
        { name: 'HIIT Flow', difficulty: 'Intermediate', duration: '30m', focus: 'Cardio' },
        { name: 'Core Strength', difficulty: 'Beginner', duration: '20m', focus: 'Core' },
    ]);
    console.log('Seeded octofit_db with sample data');
    await mongoose_1.default.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
