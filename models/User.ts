import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  company: Schema.Types.ObjectId;
  role: 'admin' | 'manager';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  role: { type: String, enum: ['admin', 'manager'], default: 'manager' },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>('User', UserSchema);
export default User;
