const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// Initialize the app
const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins during development; restrict in production
app.use(express.json());
app.use(morgan("dev")); // Log requests to the console

// Database connection
const dbURI = "mongodb://mongo:27017/todo";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  });

// Define schema and model
const TodoSchema = new mongoose.Schema({ text: String });
const Todo = mongoose.model("Todo", TodoSchema);

// Routes
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err.message);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error("Error creating todo:", err.message);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = 5000;
app.listen(5000, "0.0.0.0", () => console.log("Backend running on port 5000"));

