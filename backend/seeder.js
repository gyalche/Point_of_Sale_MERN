import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/config.js';
import itemModel from './models/itemModel.js';
import items from './utils/data.js';
import 'colors';

//config;
dotenv.config();
connectDB();

//function seeder;
const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemData = await itemModel.insertMany(items);
    console.log(`All items added`.bgGreen);
    process.exit();
  } catch (error) {
    console.log(`${error}`.bgRed.inverse);
    process.exit(1);
  }
};

importData();
