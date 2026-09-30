import mongoose from 'mongoose';
const VendorSchema = new mongoose.Schema({ name: String, status: { type: String, default: 'Active' } }, { timestamps: true });
export default mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
