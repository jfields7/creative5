const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('./auth.js');

const users = require("./users.js");
const User = users.model;

const listSchema = new mongoose.Schema({
  name: String,
  type: Number,
});

const listItemSchema = new mongoose.Schema({
  list: {
    type: mongoose.Schema.ObjectId,
    ref: 'List',
  },
  name: String,
  description: String,
});

const List = mongoose.model('List',listSchema);
const ListItem = mongoose.model('ListItem',listItemSchema);

// Create a new list. Require the user to be logged in.
router.post('/',auth.verifyToken,async(req, res)=>{
  const list = new List({
    name: req.body.name,
    type: req.body.type,
  });
  try{
    await list.save();
    return res.sendStatus(200);
  }catch(error){
    return res.sendStatus(500);
  }
});

// Get all the lists.
router.get("/",async(req, res) => {
  // return lists
  try{
    let lists = await List.find();
    return res.send(lists);
  } catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});

// Get the lists corresponding to a specific type.
router.get("/type/:type",async(req, res) => {
  // return lists
  try{
    let lists = await List.find({
      type: req.params.type
    });
    return res.send(lists);
  } catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});

// Get a single list
router.get('/:id',async (req, res) =>{
  try{
    let lists = await List.findOne({
      _id: req.params.id,
    });
    return res.send(lists);
  }catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});

// add an item to a list
router.post('/item/:id',auth.verifyToken,async (req, res) =>{
  if(!req.body.description){
    console.log("No description attached.");
    return res.status(400).send({
      message: "No description attached."
    });
  }
  if(!req.body.name){
    console.log("No name attached.");
    return res.status(400).send({
      message: "No name attached."
    });
  }
  try{
    const item = new ListItem({
      list: req.params.id,
      name: req.body.name,
      description: req.body.description,
    });
    await item.save();
    return res.sendStatus(200);
  }catch(error){
    return res.sendStatus(500);
  }
});

// get all the list items.
router.get("/item/",async(req, res) => {
  console.log("GET request submitted.");
  try{
    /*let items = await ListItem.find().sort({
      created: 1,
    });*/
    let items = [];
    return res.send(items);
  } catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all the list items for one list.
router.get("/item/:id",async (req, res) => {
  try{
    let items = await ListItem.find({
      list: req.params.id,
    }).sort({
      created: 1,
    });
    return res.send(items);
  } catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: List,
  routes: router,
}
