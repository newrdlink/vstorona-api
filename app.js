const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

const upload = require('express-fileupload');
// const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const cors = require('cors');
const router = require('./router');
const { BD_ADD } = require('./config');
const errCtl = require('./middlewares/handlerErrors');

const app = express();

// const whiteList = ['http://localhost:3000', '188.134.76.55'];
app.use(cors());
app.use(upload());

const { PORT = 3002 } = process.env;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

mongoose.connect(BD_ADD, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.use(errors());
app.use(errCtl);

app.listen(PORT, () => {
  console.log(`app listening port ${PORT}`);
});
