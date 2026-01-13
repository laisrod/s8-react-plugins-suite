import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from '../types/index.js';

// Interface que combina IUser com Document do Mongoose
interface IUserDocument extends IUser, Document {
  _id: string;
}

// Schema do Mongoose
const userSchema = new Schema<IUserDocument>(
  {
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    hobby: { type: String, default: '' }
  },
  {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
  }
);

// Model tipado - verifica se já existe para evitar erro em hot reload
const User: Model<IUserDocument> = mongoose.models.User as Model<IUserDocument> || mongoose.model<IUserDocument>('User', userSchema);

export { User };
export default User;