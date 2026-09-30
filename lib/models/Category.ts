import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  count: number;
  growth: string;
  parentCategory?: string;
  iconUrl?: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
  growth: { type: String, default: '+0%' },
  parentCategory: { type: String },
  iconUrl: { type: String },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
