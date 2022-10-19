import userModel from '../models/userModel.js';
//login;
export const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await userModel.findOne({ userId, password });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('Unable to login');
    }
  } catch (error) {
    console.log(error);
  }
};

//register
export const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send('New User Added Successfully');
  } catch (error) {
    console.log(error);
  }
};
