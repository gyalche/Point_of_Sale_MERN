import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import 'colors';
import connectDB from './config/config.js';
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
//database conig;
connectDB();

//routes;
import itemRoutes from './routes/itemRoutes.js';
app.use('/api/items', itemRoutes);

//PORT;
const PORT = process.env.PORT || 3000;

//listen
app.listen(PORT, () => {
  console.log(`Server Running on port http://localhost:${PORT}`.bgCyan);
});
