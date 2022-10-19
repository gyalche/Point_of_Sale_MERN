import express from 'express';
import {
  loginController,
  registerController,
} from '../controllers/userController.js';

const router = new express.Router();

//login;
router.post('/login', loginController);

//register;
router.post('/register', registerController);
export default router;
