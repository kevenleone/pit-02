// const bodyParser = require('body-parser')
// const cors = require('cors');
const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");

const UserRouter = require("./routes/user.router");

mongoose.connect("mongodb://localhost:27017/pitang02", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(morgan('dev'))

app.get("/", (request, response) => {
  response.json({ message: "Hello World" });
});

app.use("/api", UserRouter);

app.listen(3333, () => {
  console.log("Rodando na porta 3333");
});
