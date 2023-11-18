const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
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
},
{
    timestamps: true
}
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;