import express, { Router } from 'express';
import {
  getAllChartData,
  getChartDataById,
  createChartData,
  updateChartData,
  deleteChartData
} from '../controllers/chartDataController.js';

const router: Router = express.Router();

router.get('/', getAllChartData);
router.get('/:id', getChartDataById);
router.post('/', createChartData);
router.put('/:id', updateChartData);
router.delete('/:id', deleteChartData);

export { router };
export default router;

