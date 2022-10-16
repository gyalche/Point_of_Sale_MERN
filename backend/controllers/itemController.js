import itemModel from '../models/itemModel.js';
export const getItemController = async (req, res) => {
  try {
    const Items = await itemModel.find();
    res.status(200).send(Items);
  } catch (error) {
    console.log(`${error}`);
  }
};

//add items;
export const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).send('Item created sucessfully');
  } catch (error) {
    res.status(400).send('error', error);
    proccess.exit(1);
  }
};
