import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  user: string;
  score: number;
  rank?: number;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  user: { type: String, required: true },
  score: { type: Number, required: true },
  rank: Number,
}, { timestamps: true });

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
