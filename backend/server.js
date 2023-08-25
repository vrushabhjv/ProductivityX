const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use bodyParser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cors middleware to handle CORS issues
app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/ProductivityX';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Task schema
const taskSchema = new mongoose.Schema({
    taskName: String,
    startTime: String,
    endTime: String,
    priority: String
});

const Task = mongoose.model('Task', taskSchema);

// Create a Route to Handle Task Creation
app.post('/create-task', (req, res) => {
    // Retrieve task data from the request body
    const { taskName, startTime, endTime, priority } = req.body;

    // Create a new task object using the Task model
    const newTask = new Task({
        taskName,
        startTime,
        endTime,
        priority,
    });

    // Save the task to the database
    newTask.save()
        .then(() => {
            console.log('Task saved to database');
            res.status(201).json({ message: 'Task created successfully' });
        })
        .catch((error) => {
            console.error('Error saving task:', error);
            res.status(500).json({ message: 'An error occurred while creating the task' });
        });
});

// Update Task Route
app.put('/update-task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTaskData = req.body;

        // Convert the taskId to a mongoose ObjectId
        const mongooseTaskId =new mongoose.Types.ObjectId(taskId);

        // Find the task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(mongooseTaskId, updatedTaskData, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'An error occurred while updating the task' });
    }
});


// Retrieve All Tasks Route
app.get('/get-tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
        console.log("All tasks retrived")
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ message: 'An error occurred while retrieving tasks' });
    }
});

// Serve static files (if needed)
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
