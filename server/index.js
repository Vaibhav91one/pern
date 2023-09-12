const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Routes


//create Todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const AllTodos = await pool.query("SELECT * FROM todo");
        res.json(AllTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows);
    } catch (error) {
        console.log(error.message);
    }
})


//update todo
app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const todoUpdate = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was Updated");
    } catch (error) {
        console.log(error.message);
    }
})

//delete todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todoDelete = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was Deleted");
    } catch (error) {
        console.log(error.message);
    }
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server Started on port number ${PORT}`)
})