import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  stock: number;
  vendor: string;
  customizable: boolean;
  status: string;
  imageUrl?: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  vendor: { type: String, required: true },
  customizable: { type: Boolean, default: false },
  status: { type: String, required: true, default: 'In Stock' },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
