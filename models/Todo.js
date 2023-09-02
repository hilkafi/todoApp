const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Name is required"] 
    },
    description: {
        type: String
    },
    status: {
        type: String
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;