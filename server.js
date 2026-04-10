const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/tasks")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))


//schema

const Task = mongoose.model("Task", {
    text: String,
    done: Boolean
});


//criar tarefa
app.post("/tasks", async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
}
);


//listar tarefas
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

//atualizar tarefa
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

//deletar tarefa
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
});





app.listen(3000, () => console.log("Server running on port 3000"));
