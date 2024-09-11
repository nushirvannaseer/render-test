const express = require("express");
const {User, validate} = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth')

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("courses");
    res.send(users);
  } catch (e) {
    console.log("Error fetching users", e);
    res.send(e);
  }
});

// /user/:id
//get a user with specific id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    console.log(user);
    return res.send(user);
  } catch (e) {
    console.log("Error fetching user with id: ", id, e);
    res.errored(e);
  }
});

// /user/
//sign up
router.post("/", async (req, res) => {
  const user = req.body;
  const {error} = validate(user)
  if(error){
    return res.status(400).send(error.details[0].message)
  }

  try {
    const dbUser = await User.findOne({ email: user.email });

    if (dbUser) return res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = new User(user);

    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (e) {
    console.log("Error creating user: ", e);
    res.status(500).send(e);
  }
});

router.put("/:id", async(req, res)=>{

})

router.put("/:id/:courseId", async (req, res) => {
  //validation
  // const {error} = validate(req.body)
  // if(error){
  //   return res.status(400).send(error.details[0].message)
  // }
  try {
    let user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).send("User not found");
    }
    user.courses.push(req.params.courseId)
    const updatedUser = await user.save()


    return res.status(200).send(updatedUser);
    //This kind of update can be used if we want to do some additional work with our user object
    //before we update it
    //e.g. we want to check whether we have permission to update the user or not
    // let user = await User.findById(req.params.id);
    // if (!user) {
    //   return res.send("User not found");
    // }
    // user.courses.push(req.body.course)
    // console.log(user)
    // const updatedUser = await user.save()
    

    // return res.send(updatedUser);
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
});

router.patch("/:id/:name", (req, res) => {
  res.send("User PATCH request");
});

router.patch("/:id/:email");

router.delete("/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  console.log(deletedUser);
  res.send(deletedUser);
});

module.exports = router;
