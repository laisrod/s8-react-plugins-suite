import express, { Router } from 'express';
import {
  getAllMapLocations,
  getMapLocationById,
  createMapLocation,
  updateMapLocation,
  deleteMapLocation
} from '../controllers/mapLocationController.js';

const router: Router = express.Router();

router.get('/', getAllMapLocations);
router.get('/:id', getMapLocationById);
router.post('/', createMapLocation);
router.put('/:id', updateMapLocation);
router.delete('/:id', deleteMapLocation);

export { router };
export default router;

