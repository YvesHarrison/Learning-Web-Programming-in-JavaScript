const  todoItems = require("./todo");
const connection = require("./database_connection");
async function main() {
    const created_task1 = await  todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
    //console.log(created_task1);
    //console.log(1);
    const created_task2 = await  todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
    //console.log(created_task2);
    //console.log(1);
    let all_task = await todoItems.getAllTasks();
    console.log(all_task);
    //console.log(1);
    await todoItems.removeTask(created_task1._id);
    //console.log(1);
    all_task = await todoItems.getAllTasks();
    console.log(all_task);
    //console.log(1);
    await todoItems.completeTask(created_task2._id);
    //console.log(1);
    const new_task2 = await todoItems.getTask(created_task2._id);
    console.log(new_task2);
    //console.log(1);
    const db = await connection();
  	await db.serverConfig.close();
	console.log("Done!");
}

main().catch(error => {
  console.log(error);
});