const express = require("express");

const router = express.Router();

const {
    getTasks,
    getTaskByID,
    createTask,
    deleteTask,
    putUpdateTask,
    deleteMultipleTask
} = require("../controllers/task");

router.get("/", getTasks);

router.get("/:taskID", getTaskByID);

router.post("/", createTask);

router.delete("/:taskID", deleteTask);

router.delete("/", deleteMultipleTask);

router.put("/:taskID", putUpdateTask);

module.exports = router;
