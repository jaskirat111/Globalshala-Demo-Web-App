const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// User Schema
var rintern= new Schema({
    number:{
    type: String,
    required: true
  },
  duration:{
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },

  hr:{
    type: String,
    required: true
  },
  interviewdate:{
    type: Date,
    required: true
  },
  interviewer:{
    type: String,
    required: true
  },
  AI:{
    type: String,
    required: true
  },
  gd:{
    type: String,
    required: true
  },
  market:{
    type: String,
    required: true
  },
  cybersec:{
    type: String,
    required: true
  },
  webdjs:{
    type: String,
    required: true
  },
  webdph:{
    type: String,
    required: true
  },
  webdpy:{
    type: String,
    required: true
  },
  id1:{
    type: String,
    required: true
  },
  id2:{
    type: String,
    required: true
  },
  id3:{
    type: String,
    required: true
  },
  id4:{
    type: String,
    required: true
  },
  id5:{
    type: String,
    required: true
  },
  id6:{
    type: String,
    required: true
  },
  id7:{
    type: String,
    required: true
  },
  add:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
});

mongoose.model('Rintern', rintern);
// const Requestintern = module.exports = mongoose.model('requestintern', RequestinternSchema);
