const asyncHandler = require('express-async-handler');
const Todo = require("../models/todoModel");

/**The reason is to use asyncHandler so that we don't have to hanlde 
*the error manaully. We have defined a error handler middleware which will
* handle the error. This asyncHandler will send error data accordingly to that middleware
*/

/**
 * @desc Get todos
 * @route GET /api/todos
 * @access Private
 */
const getTodos = asyncHandler(async (req, res) => {
    res.json({
        message: "Todos fetched successfully!",
        data: await Todo.find({ user: req.user.id })
    });
});

/**
 * @desc Create todo
 * @route Post /api/todos
 * @access Private
 */
const createTodo = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        res.json({message: "Title is required"});
    }

   const newTodo = await Todo.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        status: "pending"
   });

   res.json({
        message: "Todo created successfully!",
        data: newTodo
   });
});

/**
 * @desc Update todo
 * @route Put /api/todos/:id
 * @access Private
 */
const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(400);
        throw new Error("Todo isn't existed!");
    }

    if (todo?.user?.toString() !== req.user.id) {
        res.status(400);
        throw new Error("Not authorized");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        },
        {new: true}
   );

   res.json({
        message: "Todo updated successfully!",
        data: updatedTodo
   });
});

/**
 * @desc Delete todo
 * @route Delete /api/todos/:id
 * @access Private
 */
const deleteTodo = asyncHandler(async (req, res) => {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(400);
        throw new Error("Todo isn't existed!");
    }

    if (todo?.user?.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }

    await Todo.deleteOne({_id: req.params.id});

    res.json({
        message: "Todo deleted successfully!",
        data: req.params.id
   });
});

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};