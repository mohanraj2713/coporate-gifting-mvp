import mongoose from 'mongoose';
const InventorySchema = new mongoose.Schema({ item: String, count: Number }, { timestamps: true });
export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
