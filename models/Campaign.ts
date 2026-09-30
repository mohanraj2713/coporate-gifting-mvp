import { Schema, model, models, Document } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  occasion: string;
  gift: Schema.Types.ObjectId;
  quantity: number;
  budget: number;
  deliveryDate: Date;
  message?: string;
  logo?: string;
  company: Schema.Types.ObjectId;
  status: 'draft' | 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}

const CampaignSchema = new Schema<ICampaign>({
  name: { type: String, required: true },
  occasion: { type: String, required: true },
  gift: { type: Schema.Types.ObjectId, ref: 'Gift', required: true },
  quantity: { type: Number, required: true },
  budget: { type: Number, required: true },
  deliveryDate: { type: Date, required: true },
  message: String,
  logo: String,
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'processing', 'shipped', 'delivered'],
    default: 'draft',
  },
  createdAt: { type: Date, default: Date.now },
});

const Campaign = models.Campaign || model<ICampaign>('Campaign', CampaignSchema);
export default Campaign;
