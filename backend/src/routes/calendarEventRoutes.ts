import express, { Router } from 'express';
import {
  getAllCalendarEvents,
  getCalendarEventById,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
} from '../controllers/calendarEventController.js';

const router: Router = express.Router();

// Rotas CRUD
router.get('/', getAllCalendarEvents);
router.get('/:id', getCalendarEventById);
router.post('/', createCalendarEvent);
router.put('/:id', updateCalendarEvent);
router.delete('/:id', deleteCalendarEvent);

export { router };
export default router;

