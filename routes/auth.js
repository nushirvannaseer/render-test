const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //JOI: if invalid body return error
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  const {error} = schema.validate(req.body);
  if(error){
    console.log(error.details)
    return res.status(400).send({
      message: error.details[0].message,
      context: error.details[0].context
    })
  }

  try {
    const user = await User.findOne({ email }); // => {email: email}
    if (!user) {
      return res.status(400).send("Incorrect email or password");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("Valid password: ", isValidPassword);
    if (isValidPassword) {
      //create a token
      //send the token back to the client
      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET
      );
      return res.status(200).send(token);
    }
    return res.status(400).send("Incorrect email or password");
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
});

module.exports = router;
