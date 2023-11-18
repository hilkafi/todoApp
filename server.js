const express = require('express');
const dotenv = require("dotenv").config();
const connectDatabase = require("./config/db");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//database connection
connectDatabase();

//todo routes
app.use("/api/todos", todoRoutes);

//user routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));