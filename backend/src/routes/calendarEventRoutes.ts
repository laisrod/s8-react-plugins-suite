import express, { Router } from 'express';
import {
  getAllCalendarEvents,
  getCalendarEventById,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
} from '../controllers/calendarEventController.js';

const router: Router = express.Router();

router.get('/', getAllCalendarEvents);
router.get('/:id', getCalendarEventById);
router.post('/', createCalendarEvent);
router.put('/:id', updateCalendarEvent);
router.delete('/:id', deleteCalendarEvent);

export { router };
export default router;
