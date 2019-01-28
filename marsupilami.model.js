const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: 'This field is required.'
    },
    age: {
        type: number,
    },
    famille: {
        type: String
    },
    race: {
        type: String
    },
    nourriture: {
        type: String
    },
      password:{
        type: String,
        required: true
      }
    });




mongoose.model('marsupilami', marsupilamiSchema);