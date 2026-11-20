import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IApplication extends Document {
  applicationId: string;
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  courseSemester: string;
  domain: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  submittedAt: Date;
  notes: string;
}

const ApplicationSchema = new Schema<IApplication>({
  applicationId: { type: String, required: true, unique: true },
  fullName:       { type: String, required: true, trim: true },
  email:          { type: String, required: true, trim: true, lowercase: true },
  phone:          { type: String, required: true, trim: true },
  collegeName:    { type: String, required: true, trim: true },
  courseSemester: { type: String, required: true, trim: true },
  domain:         { type: String, required: true, trim: true },
  status:         { type: String, enum: ['pending','reviewed','accepted','rejected'], default: 'pending' },
  submittedAt:    { type: Date, default: Date.now },
  notes:          { type: String, default: '' },
});

export const Application: Model<IApplication> =
  mongoose.models.Application ||
  mongoose.model<IApplication>('Application', ApplicationSchema);
