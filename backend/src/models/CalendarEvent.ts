import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICalendarEvent } from '../types/index.js';

// Interface que combina ICalendarEvent com Document do Mongoose
interface ICalendarEventDocument extends ICalendarEvent, Document {
  _id: string;
}

// Schema do Mongoose
const calendarEventSchema = new Schema<ICalendarEventDocument>(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    color: { type: String, required: true, default: 'blue' },
    description: { type: String, default: '' }
  },
  {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
  }
);

// Model tipado
const CalendarEvent: Model<ICalendarEventDocument> = mongoose.model<ICalendarEventDocument>('CalendarEvent', calendarEventSchema);

export { CalendarEvent };
export default CalendarEvent;

