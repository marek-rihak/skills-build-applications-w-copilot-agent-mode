import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  duration?: string;
  focus?: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: String,
  focus: String,
}, { timestamps: true });

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
