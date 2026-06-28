import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  duration: string;
  calories: number;
  userId?: string;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  duration: { type: String, required: true },
  calories: { type: Number, required: true },
  userId: String,
}, { timestamps: true });

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
