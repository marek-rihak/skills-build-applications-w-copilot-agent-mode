import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  fitnessGoal?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  fitnessGoal: String,
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
