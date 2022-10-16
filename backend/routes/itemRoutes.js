import express from 'express';
import {
  getItemController,
  addItemController,
} from '../controllers/itemController.js';

const router = express.Router();

//routes;
//method-get;
router.get('/get-item', getItemController);

//method-post;
router.post('/add-item', addItemController);
export default router;
