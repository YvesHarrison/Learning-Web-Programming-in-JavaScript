const express = require("express");
const router = express.Router();
let record={};
let requestnumber=0;
const data=require("../data/");
const taskData=data.tasks;

function checknumber(num){
	return !isNaN(parseFloat(num))&&isFinite(num);
}

function check_para(title,description,hoursEstimated,completed){
	if(title==null||title==undefined||title=="") throw "You must provide a title to update for";
	if(description==null||description==undefined||description=="") throw "You must provide a description to update for";
	if(hoursEstimated==null||hoursEstimated==undefined||hoursEstimated=="") throw "You must provide a hoursEstimated to update for";
    if(completed==null||completed==undefined) throw "You must provide a completed parameter to update for";
    	
    if (typeof(title) !== "string") throw "Invalid title type!";
    if (typeof(description) !== "string") throw "Invalid description type!";
    if (!checknumber(hoursEstimated)) throw "Invalid hoursEstimated type!";
    if(Number(hoursEstimated)<0) throw "Invalid hoursEstimated value!";
    if (typeof(completed)!=="boolean") throw "Invalid completed type!";
}

// function static(request){
// 	let current=request.path;
// 	if(!record[current])record[current]=0;

// 	record[current]++;
// 	requestnumber++;
// 	if(record[current]==1)console.log(current,"has been accessed for",record[current],"time");
// 	else console.log(current,"has been accessed for",record[current],"times");

// 	next();
// }

router.get("/tasks",async(req,res)=>{
	console.log(req.query);
	try{
		
			const postList = await taskData.getAllTasks();
			res.json(postList);
		
		//else if(req.query.skip){
			//console.log("skip");
		//}
		//else if(req.query.take){
			//console.log("take");
		//}
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.get("/tasks/:id",async(req,res)=>{
	try{
		const postList = await taskData.getTaskById(req.params.id);
		res.json(postList);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.post("/tasks",async(req,res)=>{
	const postData=req.body;
	try{
		const { title,description,hoursEstimated,completed}=postData;
		check_para(title,description,hoursEstimated,completed);
		const newPost=await taskData.addTask(title,description,hoursEstimated,completed);
		res.json(newPost);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.put("/tasks/:id",async(req,res)=>{
	const postData=req.body;
	const _id=req.params.id;
	try{
		const { title,description,hoursEstimated,completed}=postData;
		check_para(title,description,hoursEstimated,completed);
		const newPut=await taskData.updateTask(_id,title,description,hoursEstimated,completed);
		res.json(newPut);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.patch("/tasks/:id",async(req,res)=>{
	const postData=req.body;
	const _id=req.params.id;
	try{
		const { title,description,hoursEstimated,completed}=postData;
		const newPatch=await taskData.renewTask(_id,title,description,hoursEstimated,completed);
		res.json(newPatch);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.post("/tasks/:id/comments",async(req,res)=>{
	const postData=req.body;
	const _id=req.params.id;
	try{
		const {name,comment}=postData;
		const newPost=await taskData.addComment(_id,name,comment);
		res.json(newPost);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.delete("/tasks/:taskId/:commentId",async(req,res)=>{
	const taskId=params.taskId;
	const commentId=params.commentId;
	try{
		const newDelete=await taskData.deleteComment(taskId,commentId);
		res.json(newDelete);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});
module.exports = router;