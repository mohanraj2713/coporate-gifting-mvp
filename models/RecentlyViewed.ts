import mongoose from 'mongoose';
const RecentlyViewedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: String }] // Store string IDs
}, { timestamps: true });
export default mongoose.models.RecentlyViewed || mongoose.model('RecentlyViewed', RecentlyViewedSchema);
