const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type : String,
        trim: true
    },
    description: {
        type : String,  
    }
})

const Task = mongoose.model('Task', schema);

module.exports = Task;