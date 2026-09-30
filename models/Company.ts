import { Schema, model, models, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  logo?: string;
  address?: string;
  contact?: string;
  createdAt: Date;
}

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true, unique: true },
  logo: String,
  address: String,
  contact: String,
  createdAt: { type: Date, default: Date.now },
});

const Company = models.Company || model<ICompany>('Company', CompanySchema);
export default Company;
