const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./router');
const { BD_ADD } = require('./config');
const errCtl = require('./middlewares/handlerErrors');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(BD_ADD, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(router);

app.use(errCtl);

app.listen(PORT, () => {
  console.log(`app listening port ${PORT}`);
});
