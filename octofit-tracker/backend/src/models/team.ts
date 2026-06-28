import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  city?: string;
  members?: string[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  city: String,
  members: [String],
}, { timestamps: true });

export const Team = mongoose.model<ITeam>('Team', teamSchema);
