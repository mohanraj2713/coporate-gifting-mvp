import mongoose from 'mongoose';
const WishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: String }] // Store string IDs to make it easy
}, { timestamps: true });
export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
