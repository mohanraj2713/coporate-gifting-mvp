import mongoose from 'mongoose';
const DeliverySchema = new mongoose.Schema({ orderId: String, status: String }, { timestamps: true });
export default mongoose.models.Delivery || mongoose.model('Delivery', DeliverySchema);
