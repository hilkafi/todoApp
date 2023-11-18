const express = require("express");
const router = express.Router();
const { 
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate,  getTodos);
router.post("/", authenticate, createTodo);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

module.exports = router;