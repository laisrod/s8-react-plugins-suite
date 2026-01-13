import mongoose, { Schema, Document, Model } from 'mongoose';
import type { IMapLocation } from '../types/index.js';

interface IMapLocationDocument extends IMapLocation, Document {
  _id: string;
}

const mapLocationSchema = new Schema<IMapLocationDocument>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    latitude: { 
      type: Number, 
      required: true,
      min: -90,
      max: 90
    },
    longitude: { 
      type: Number, 
      required: true,
      min: -180,
      max: 180
    },
    description: { 
      type: String, 
      default: '' 
    },
    address: { 
      type: String, 
      default: '' 
    },
    category: {
      type: String,
      required: true,
      enum: ['restaurant', 'park', 'museum', 'hotel', 'shopping', 'other'],
      default: 'other'
    }
  },
  {
    timestamps: true
  }
);

// Model tipado - verifica se já existe para evitar erro em hot reload
const MapLocation: Model<IMapLocationDocument> = mongoose.models.MapLocation as Model<IMapLocationDocument> || mongoose.model<IMapLocationDocument>(
  'MapLocation', 
  mapLocationSchema
);

export { MapLocation };
export default MapLocation;
