const Task = require("../models/tasks");

//! 1. Create a new Task + 6. Bulk add tasks

exports.createTask = (req, res) => {
    Task.create(req.body)
        .then((data) => {
            res.status(201).json({ id: data._id });
        })
        .catch((err) =>
            res.status(400).json({
                message: "Unable to add new task",
                error: err.message,
            })
        );
};

/*exports.createTask = (req, res) => {
    Task.create(req.body)
        .then((data) => {
            if (data.length > 1) {
                for (let i = 0; i < data.length; i++) {
                    let id = data[i]._id;
                    console.log(id);
                    res.status(201).json({ id: id });
                }
            }

        })
        .catch((err) =>
            res.status(400).json({
                message: "Unable to add new task",
                error: err.message,
            })
        );
};*/


//! 2. List all tasks created

exports.getTasks = (req, res) => {
    Task.find()
        .then((data) => {
            // console.log({ data });
            res.status(200).json({ tasks: data });
        })
        .catch((err) =>
            res.status(404).json({
                message: "No Task Found", error: err.message
            })
        );
}

//! 3. Get a specific task

exports.getTaskByID = (req, res) => {
    // console.log(req.params.taskID);
    Task.findOne({ _id: req.params.taskID })
        .then((data) => {
            // console.log(data);
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(404).json({
                error: "There is no task at that id"
            })
        })
}

//! 4. Delete a specific task

exports.deleteTask = (req, res) => {
    // console.log(req.params.taskID);
    Task.findByIdAndRemove(req.params.taskID)
        .then((data) => {
            res.status(204).json({ data });
        })
        .catch((err) =>
            res.status(200).json({
                error: "No Task Found"
            })
        );
}

//! 5. Edit the title or completion of a specific task

exports.putUpdateTask = (req, res) => {
    // console.log("id: ", req.params.taskID);
    // console.log("id: ", req.body);
    Task.findByIdAndUpdate(req.params.taskID, req.body)
        .then((data) => {
            return res.status(204).json(data);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ error: "There is no task at that id" })
        );
};

//! 7. Bulk delete tasks

exports.deleteMultipleTask = async (req, res) => {
    // console.log(req.body);

    let array = await req.body;

    for (let i = 0; i < array.length; i++) {
        let id = await array[i].id;
        // console.log(id);
        Task.findByIdAndRemove(id)
            .then((data) => {
                res.status(204).json(data);
            })
            .catch((err) =>
                res.status(400).json({
                    error: "No Task Found"
                })
            );
    }


}