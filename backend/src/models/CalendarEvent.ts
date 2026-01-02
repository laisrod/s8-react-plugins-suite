import mongoose, { Schema, Document, Model } from 'mongoose';
import type { ICalendarEvent } from '../types/index.js';

interface ICalendarEventDocument extends ICalendarEvent, Document {
  _id: string;
}

const calendarEventSchema = new Schema<ICalendarEventDocument>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    start: { 
      type: Date, 
      required: true
    },
    end: { 
      type: Date 
    },
    description: { 
      type: String, 
      default: '' 
    },
    color: { 
      type: String, 
      default: '#3788d8'
    },
    allDay: { 
      type: Boolean, 
      default: false 
    }
  },
  {
    timestamps: true
  }
);

const CalendarEvent: Model<ICalendarEventDocument> = mongoose.model<ICalendarEventDocument>(
  'CalendarEvent', 
  calendarEventSchema
);

export { CalendarEvent };
export default CalendarEvent;

