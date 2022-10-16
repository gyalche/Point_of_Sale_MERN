import itemModel from '../models/itemModel.js';
export const getItemController = async (req, res) => {
  try {
    const Items = await itemModel.find();
    res.status(200).send(Items);
  } catch (error) {
    console.log(`${error}`);
  }
};
