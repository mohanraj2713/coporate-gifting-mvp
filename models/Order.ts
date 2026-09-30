import { Schema, model, models, Document } from 'mongoose';

export interface IOrder extends Document {
  campaign: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  gift: Schema.Types.ObjectId;
  quantity: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  courier?: string;
  deliveryDate?: Date;
  invoice: {
    invoiceNumber: string;
    subtotal: number;
    tax: number;
    total: number;
    date: Date;
  };
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'Recipient', required: true },
  gift: { type: Schema.Types.ObjectId, ref: 'Gift', required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered'],
    default: 'pending',
  },
  trackingNumber: String,
  courier: String,
  deliveryDate: Date,
  invoice: {
    invoiceNumber: { type: String, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = models.Order || model<IOrder>('Order', OrderSchema);
export default Order;
