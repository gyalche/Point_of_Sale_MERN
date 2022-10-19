import express from 'express';
import {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
} from '../controllers/itemController.js';

const router = express.Router();

//routes;
//method-get;
router.get('/get-item', getItemController);

//method-post;
router.post('/add-item', addItemController);
export default router;
//method-put;
router.put('/edit-item', editItemController);

//method-delete;
router.delete('/delete-item', deleteItemController);
