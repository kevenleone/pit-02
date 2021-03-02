const bodyParser = require('body-parser')
const cors = require('cors');
const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");

const authMiddleware = require('./middlewares/auth.middleware');

require('dotenv').config()

const {HTTP_PORT, MONGO_URL} = process.env;

const UserRouter = require("./routes/user.router");

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(authMiddleware)
app.use(cors());
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get("/", (request, response) => {
  response.json({ message: "Hello World" });
});

app.use("/api", UserRouter);

app.listen(HTTP_PORT, () => {
  console.log(`Rodando na porta ${HTTP_PORT}`);
});
