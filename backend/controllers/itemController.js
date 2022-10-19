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
    res.status(400).json('error', error);
    proccess.exit(1);
  }
};

//update item controller;
export const editItemController = async (req, res) => {
  try {
    await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send('Item updated');
  } catch (error) {
    res.status(400).send(error);
  }
};

//delete item controller;
export const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await itemModel.findByIdAndDelete(itemId);
    res.staus('Item delted Sucessfully');
  } catch (error) {
    console.log(error);
  }
};
