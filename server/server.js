const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/cv',{
  useNewUrlParser: true
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const list = require("./list.js");
app.use("/api/list",list.routes);

app.listen(3004, () => console.log('Server listening on port 3004!'));
