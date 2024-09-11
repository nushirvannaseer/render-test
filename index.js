require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth")
const courseRouter = require("./routes/course")

app.use(express.json());

console.log("MONGO URL", process.env.MONGO_DB_URL)
const connectionString = process.env.MONGO_DB_URL

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Not connected to DB", err);
  });

app.use("/user", usersRouter);
app.use('/auth', authRouter)
app.use('/course', courseRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
}); 
