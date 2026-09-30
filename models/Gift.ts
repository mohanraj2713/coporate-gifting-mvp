import { Schema, model, models, Document } from 'mongoose';

export interface IGift extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  minOrderQuantity: number;
  customizationAvailable: boolean;
  createdAt: Date;
}

const GiftSchema = new Schema<IGift>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, index: true },
  imageUrl: String,
  minOrderQuantity: { type: Number, default: 1 },
  customizationAvailable: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Gift = models.Gift || model<IGift>('Gift', GiftSchema);
export default Gift;
