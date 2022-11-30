const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    is_completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Tasks", TaskSchema);

module.exports = Task;
