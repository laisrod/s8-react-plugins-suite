import mongoose, { Schema, Document, Model } from 'mongoose';
import type { IChartData } from '../types/index.js';

interface IChartDataDocument extends IChartData, Document {
  _id: string;
}

const chartDataSchema = new Schema<IChartDataDocument>(
  {
    label: { 
      type: String, 
      required: true,
      trim: true
    },
    value: { 
      type: Number, 
      required: true,
      min: 0
    },
    category: { 
      type: String, 
      required: true,
      trim: true
    },
    chartType: { 
      type: String, 
      enum: ['bar', 'line'],
      required: true
    },
    date: { 
      type: Date 
    }
  },
  {
    timestamps: true
  }
);

const ChartData: Model<IChartDataDocument> = mongoose.model<IChartDataDocument>(
  'ChartData', 
  chartDataSchema
);

export { ChartData };
export default ChartData;

