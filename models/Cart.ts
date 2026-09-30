import mongoose from 'mongoose';
const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: String }] // Store string IDs
}, { timestamps: true });
export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
