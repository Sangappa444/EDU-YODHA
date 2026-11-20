import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  enquiryId: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  submittedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>({
  enquiryId:   { type: String, required: true, unique: true },
  fullName:    { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  phone:       { type: String, default: '', trim: true },
  subject:     { type: String, required: true, trim: true },
  message:     { type: String, required: true, trim: true },
  status:      { type: String, enum: ['new','read','replied'], default: 'new' },
  submittedAt: { type: Date, default: Date.now },
});

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry ||
  mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
