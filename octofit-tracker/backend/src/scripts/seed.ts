import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
async function seedDatabase() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Patel', email: 'ava@example.com', age: 29, fitnessGoal: 'Improve endurance' },
    { name: 'Liam Chen', email: 'liam@example.com', age: 34, fitnessGoal: 'Build strength' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Peak Performers', sport: 'CrossFit', city: 'Seattle', members: [users[0].name, users[1].name] },
    { name: 'Trail Blazers', sport: 'Running', city: 'Denver', members: [users[0].name] },
  ]);

  await Activity.insertMany([
    { type: 'Run', duration: '45m', calories: 520, userId: users[0]._id.toString() },
    { type: 'Strength', duration: '60m', calories: 410, userId: users[1]._id.toString() },
  ]);

  await Leaderboard.insertMany([
    { user: users[0].name, score: 1420, rank: 1 },
    { user: users[1].name, score: 1280, rank: 2 },
  ]);

  await Workout.insertMany([
    { name: 'HIIT Flow', difficulty: 'Intermediate', duration: '30m', focus: 'Cardio' },
    { name: 'Core Strength', difficulty: 'Beginner', duration: '20m', focus: 'Core' },
  ]);

  console.log('Seeded octofit_db with sample data');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
