const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log('register req.body', req.body)
  try {
    const user = await userModel.findOne({
      username: req.body.username
    });
    if (user) {
      res.status(400).send(`username ${req.body.user} already exists`);
      return;
    } else if(req.body.password.length < 6){
      res.status(400).send("Your password is short");
      return;
    } else {
      await userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
      });
      res.status(200).send("User was created")
      
    }
  } catch (error) {
    console.error('register error', error.message);
    res.status(500).send("Something went wrong")
  }
};


const login = async (req, res) => {
  console.log('login req.body', req.body)
  try {
    const user = await userModel.findOne({
      email: req.body.email
    }).exec();
    console.log('login user', user)
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id
        },
        process.env.PRIVAT_KEY,
        {
          expiresIn: 3600,
        }
      );

      res.status(200).json({
        message: "Conection ok!",
        token: token
      })
    } else {
      res.status(401).send("Invalid password")
    }
  } catch (error) {
    console.error('login error is: ', error.message)
  }
};

module.exports = {
  register,
  login
}