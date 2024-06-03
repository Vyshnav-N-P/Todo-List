const mongoose = require('mongoose');
const {Schema}=mongoose;

const TaskSchema=new Schema({id:String,task:Array,isCompleted:Array});
const TaskModel=mongoose.model("TASKS",TaskSchema,"TASKS");

module.exports=TaskModel;