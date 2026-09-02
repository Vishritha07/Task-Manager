const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

console.log("Backend server file is working");

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    startDate: String,
    endDate: String,
    completed: Boolean
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
    res.send("Task Manager Backend is running!");
});

app.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});