const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const uuidv4 = require('uuid/v4');
const collection = require("./collection");
const tasks = collection.tasks;

async function getTask(id){
    if (!id) throw "You must provide an id to search for";
    const task_collection = await tasks();
    const result = await task_collection.findOne({_id:id});
    if(result === null) throw "No such task";
    return result;
}

async function createTask(title, description){
    if(!title) throw "You must provide a title for the task";
    if(!description) throw "You must provide description for the task";
    let id = uuidv4();
    let obj={
        _id: id,
        title: title,
        description: description,
        completed: false,
        completedAt: null
    };
    const task_collection = await tasks();
    const insert_info = await task_collection.insertOne(obj);
    if (insert_info.insertedCount === 0) throw "Could not add task";
    const new_id = insert_info.insertedId;
    const result = await getTask(new_id);
    return result;
}

async function getAllTasks(){
    const task_collection = await tasks();
    const get_tasks =  await task_collection.find({}).toArray();
    return get_tasks;
}

async function completeTask(taskId){
    if (!taskId) throw "You must provide an task id to search for";
    const task_collection = await tasks();
    const update_task = await getTask(taskId);
    let title = update_task.title;
    let description = update_task.description;
    let completedAt = update_task.completedAt;
    const obj = {
        _id: taskId,
        title: title,
        description: description,
        completed: true,
        completedAt: completedAt
    }
    const result = await task_collection.updateOne({_id:taskId}, {$set:obj});
//if I use code in line 56 the command line return me with an error saying "{ MongoError: the update operation document must contain atomic operators."But line 54 works while
    //const result = await task_collection.updateOne({_id:taskId}, obj);
    if(result.modifiedCount === 0) throw "Could not update task";
    return getTask(taskId);
}

async function removeTask(id){
    if (!id) throw "You must provide an id to remove for";
    const task_collection = await tasks();
    const result = await task_collection.removeOne({_id:id});
    if(result.deletedCount === 0) throw `Could not remove task with id of ${id}`;
    console.log(`Removed task with id of ${id} successfully`);
}


module.exports = {
    description: "This is a fileData.js for CS-546 lab3",
    firstName: "Xinzhe", 
    lastName: "Li", 
    studentId: "10434405",
    createTask,
    getAllTasks,
    getTask,
    completeTask,
    removeTask
};

// async function main() {
//     // const createdTask = await createTask("My First Task", "This is the first thing I need to do today");
//     // console.log(createdTask);
//     const getTasks = await getAllTasks();
//     console.log(getTasks);
//     removeTask("d87d62ec-6792-43b3-8d2f-2c5000857030");
//     const task = await getTask("d87d62ec-6792-43b3-8d2f-2c5000857030");
//     console.log("hhhh");
//     console.log(task);
//     //const finishedTask = await completeTask(task._id); 
//     //console.log(finishedTask);

// }

// main();

