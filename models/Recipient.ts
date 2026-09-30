import { Schema, model, models, Document } from 'mongoose';

export interface IRecipient extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  department?: string;
  type: 'employee' | 'customer';
  campaign: Schema.Types.ObjectId;
  createdAt: Date;
}

const RecipientSchema = new Schema<IRecipient>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  department: String,
  type: { type: String, enum: ['employee', 'customer'], required: true },
  campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Recipient = models.Recipient || model<IRecipient>('Recipient', RecipientSchema);
export default Recipient;
