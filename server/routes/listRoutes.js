const express = require("express");
const router = express.Router();
const ListModel = require("../models/list.js");
const TaskModel = require("../models/tasks.js");
//GET LIST
router.get("", async (req, res) => {
  try {
    const lists = await ListModel.find({});
    res.send(lists);
  } catch (error) {
    console.log(error.message);
  }
});
//CREATE LIST
router.post("/createlist", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const list = await ListModel.create({ name: name });
    res.send(list);
  } catch (error) {
    console.log(error.message);
  }
});
//EDIT LIST
router.post(`/editlist`, async (req, res) => {
  try {
    const name = req.body.name;
    const id = req.body.id;
    const list = await ListModel.find({ _id: id });
    console.log(list[0]);
    if (!list) {
      res.status(404).send("List not found");
    }
    await ListModel.updateOne({ _id: id }, { name: name });
    res.status(200).send("Updated Successfully");
  } catch (error) {
    console.log(error);
  }
});
//DELETE LIST
router.delete(`/deletelist/:name`, async (req, res) => {
  try {
    const name = req.params.name;
    console.log(name);
    const list = await ListModel.findOne({ name: name }, { _id: 1 });
    if (!list) {
      res.status(404).send("List not found");
    }
    await ListModel.deleteOne({ name: name });
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    console.log(error.message);
  }
});





//GET TASKS
router.get(`/:id/tasks`, async (req, res) => {
  try {
    const id = req.params.id;
    const list = await ListModel.findOne({ name: id });
    const tasks = await TaskModel.find(
      { id: list.id },
      { _id: 1, isCompleted: 1, task: 1 }
    );
    res.send(tasks[0]);
  } catch (error) {
    console.log(error.message);
  }
});
//Create Task
router.post(`/:id/tasks`, async (req, res) => {
  try {
    const value = req.body.value;
    const id = req.params.id;
    console.log("Task: " + id);
    const list = await ListModel.findOne({ name: id }, { _id: 1 });
    if (!list) {
      res.status(404).send("List not found");
    }
    const findTask = await TaskModel.findOne({ id: list._id });
    if (!findTask) {
      await TaskModel.create({
        task: [value],
        id: list._id,
        isCompleted: [false],
      });
    }
    findTask.task.push(value);
    findTask.isCompleted.push(false);
    findTask.save();
    res.status(200).send("Success");
  } catch (error) {
    console.log(error.message);
  }
});

//EDIT TASK
router.post('/editTask', async (req, res) => {
    try {
      const { name, index, listname } = req.body;
  
      // Find the list by name and retrieve its _id
      const list = await ListModel.findOne({ name: listname }, { _id: 1 });
      if (!list) {
        return res.status(404).send("List not found");
      }
  
      // Find the task by the list's _id
      const findTask = await TaskModel.findOne({ id: list._id });
      if (!findTask) {
        return res.status(404).send("Task not found");
      }
  
      // Update the task at the specified index
      if (index < 0 || index >= findTask.task.length) {
        return res.status(400).send("Invalid task index");
      }
    findTask.task.set(index, name);
    //   findTask.task[index] = name;
      await findTask.save();
      console.log(name +findTask.task[index] );
      res.status(200).send("Updated Successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  });

//Toggle Completion
router.post('/tasks/changeCompletion',async(req,res)=>{
  try {
    const index=req.body.i;
    const listname=req.body.listname;
    const list = await ListModel.findOne({ name: listname }, { _id: 1 });
    if (!list) {
      res.status(404).send("List not found");
    }
    const findTask = await TaskModel.findOne({ id: list._id });
    if (!findTask) {
      res.status(404).send("error: Task not found");
    }
    findTask.isCompleted.set(index,!findTask.isCompleted[index])
    findTask.save();
    res.status(200).send("Toggled Successfully");
  } catch (error) {
    console.log(error);
  }
})
  
//DELETE TASK
router.delete(`/:id/tasks/:i`, async (req, res) => {
  try {
    const id = req.params.id;
    const i = req.params.i;
    const list = await ListModel.findOne({ name: id }, { _id: 1 });
    if (!list) {
      res.status(404).send("List not found");
    }
    const findTask = await TaskModel.findOne({ id: list._id });
    if (!findTask) {
      res.status(404).send("error: Task not found");
    }
    findTask.task.remove(findTask.task[i]);
    findTask.save();
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
