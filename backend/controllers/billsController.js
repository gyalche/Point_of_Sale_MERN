import billsModel from '../models/itemModel.js';
export const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.send('Bill Created Successfully!');
  } catch (error) {
    // res.status(400).send('error', error);
    res.send('Something went wrong');
    console.log(error);
  }
};

export const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.status(201).send(bills);
  } catch (error) {
    console.log(error);
  }
};
