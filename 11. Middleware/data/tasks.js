const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const uuidv4 = require("uuid/v4");
const collection = require("../config/collection");
const tasks = collection.tasks;

function check(num){
	return !isNaN(parseFloat(num))&&isFinite(num);
}

const exportedMethods={
	async getAllTasks(skip,take){
    	const task_collection = await tasks();
    	
    	let get_tasks =  await task_collection.find({}).limit(take).toArray();
    	get_tasks=get_tasks.splice(skip);

    	if(get_tasks&&get_tasks.length>0) return get_tasks;
    	else throw "No tasks in database or you skip to many tasks!";
	},//get 
	async getTaskById(id){
    	if (id==null||id==undefined||id=="") throw "You must provide an id to search for";
    	if (typeof(id) !== 'string') throw "Invalid id";

    	const task_collection = await tasks();
    	const result = await task_collection.findOne({_id:id});
    	if(result === null) throw "No such task in MongoDB";
    	return result;
	},// get /tasks/:id
	async addTask(title,description,hoursEstimated,completed) {
    	const task_collection = await tasks();

    	const newPost = {
    		_id: uuidv4(),
      		title: title,
      		description: description,
      		hoursEstimated:hoursEstimated,
      		completed:completed,
      		comments:[]
    	};
    	
    	const newInsertInformation = await task_collection.insertOne(newPost);
    	if (newInsertInformation.insertedCount === 0)throw "Could not add task";
    	const newId = newInsertInformation.insertedId;

    	return await this.getTaskById(newId);
	},//post /tasks
	async updateTask(id,title,description,hoursEstimated,completed){
		if (id==null||id==undefined||id=="") throw "You must provide an id to update for";
		
		const task_collection = await tasks();

		const newdata={
			title: title,
      		description: description,
      		hoursEstimated:hoursEstimated,
      		completed:completed
		}

		const update = await task_collection.updateOne({_id: id}, {$set: newdata});
	
		if (update.modifiedCount === 0) throw "Could not update task successfully";
		else console.log("Update task successfully");
		
		return await this.getTaskById(id);
	},//put
	async renewTask(id,title,description,hoursEstimated,completed){
		if (id==null||id==undefined||id=="") throw "You must provide an id to renew for";
		if((title&& typeof(title)!=="string")||(description&& typeof(description) !== "string")||(hoursEstimated&&!check(hoursEstimated))||(completed!=null&&completed!=undefined&& typeof(completed)!=="boolean"))throw "Parameters missing or wrong"

		const task_collection = await tasks();
		const newdata={};

		if(title) newdata.title= title;
		
		if(description) newdata.description=description;

		if(Number(hoursEstimated)<0) throw "Invalid hoursEstimated value!";
		if(hoursEstimated) newdata.hoursEstimated=hoursEstimated;

		if(completed!=null&&completed!=undefined) newdata.completed=completed;
		
		const update = await task_collection.updateOne({_id: id}, {$set: newdata});
		
        if (update.modifiedCount === 0) throw "Could not renew task successfully";
        else console.log("Renew task successfully");
 
		return await this.getTaskById(id);
	},//patch
	async addComment(taskId,name,comment){
		if (taskId==null||taskId==undefined||taskId=="") throw "You must provide an taskId for adding comment";
		if(name==null||name==undefined||name=="") throw "You must provide a name for a comment";
		if(comment==null||comment==undefined||comment=="") throw "You must provide a comment for a comment";
    	
    	if (typeof(name) !== "string") throw "Invalid name type!";
    	if (typeof(comment) !== "string") throw "Invalid comment type!";

    	const task_collection = await tasks();
    	
    	let task=await this.getTaskById(taskId);

    	const newComment = {
    		_id: uuidv4(),
      		name:name,
      		comment:comment
    	};

    	task.comments.push(newComment);

    	const update = await task_collection.updateOne({_id: taskId}, {$set: task});
    	if (update.modifiedCount === 0) throw "Could not add comment successfully";
        else console.log("Add comment successfully");

        return await this.getTaskById(taskId);
	},
	async deleteComment(taskId,commentId){
		if (taskId==null||taskId==undefined||taskId=="") throw "You must provide an taskId for deleting comment";
		if (commentId==null||commentId==undefined||commentId=="") throw "You must provide an commentId for deleting comment";
    	
    	const task_collection = await tasks();

    	let task=await this.getTaskById(taskId);
    	let erased = false;

    	for(let i=0;i<task.comments.length;++i){
    		if(task.comments[i]._id==commentId){
    			erased=true;
    			task.comments.splice(i, 1);
    			break;
    		}
    	}

    	if(erased){
    		const update = await task_collection.updateOne({_id: taskId}, {$set: task});
    		if (update.modifiedCount === 0) throw "Could not delete comment successfully";
        	else console.log("Delete comment successfully");
        	return await this.getTaskById(taskId);
    	}
    	else throw "Cannot find comment with '$commentId'";
	}
}

module.exports = exportedMethods;