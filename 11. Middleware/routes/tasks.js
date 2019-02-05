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
    	
    if (typeof(title) !== "string") throw "Invalid title data type!";
    if (typeof(description) !== "string") throw "Invalid description data type!";
    if (!checknumber(hoursEstimated)) throw "Invalid hoursEstimated data type!";
    if(Number(hoursEstimated)<0) throw "Invalid hoursEstimated data value!";
    if (typeof(completed)!=="boolean") throw "Invalid completed data type!";
}

router.use(function (req,res,next){
	console.log("---------------Start Middleware 1---------------------------");
	console.log("Request Body:");
	console.log(req.body);
	console.log("------------------------------------------------------------");
	console.log(req.method,"is making to", req.path);
	console.log("------------------------------------------------------------");
	next();
});

router.use(function (req,res,next){
	let current=req.path;
    if(!record[current])record[current]=0;

	record[current]++;
	requestnumber++;
	console.log("---------------Start Middleware 2---------------------------");
	if(requestnumber==1) console.log(requestnumber,"request has been made to the server");
	else console.log(requestnumber,"requests has been made to the server");

	if(record[current]==1)console.log(current,"has been accessed for",record[current],"time");
	else console.log(current,"has been accessed for",record[current],"times");
	console.log("-----------------------END------------------------------")
	next();
});

router.get("/tasks",async(req,res)=>{
	let skip=req.query.skip;
	let take=req.query.take;
	try{
		if(skip){
			if(!checknumber(skip)||skip<0) throw "Invalid skip data!";
		}
		else skip=0;
		if(take){
			if(!checknumber(take)||take<0||take>=100) throw "Invalid take data!";
			take=Math.min(100,Number(take));
		}
		else take=20;
		const postList = await taskData.getAllTasks(skip,take);
		res.status(200).json(postList);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.get("/tasks/:id",async(req,res)=>{
	try{
		const postList = await taskData.getTaskById(req.params.id);
		res.status(200).json(postList);
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
		res.status(200).json(newPost);
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
		res.status(200).json(newPut);
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
		res.status(200).json(newPatch);
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
		res.status(200).json(newPost);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.delete("/tasks/:taskId/:commentId",async(req,res)=>{
	const taskId=req.params.taskId;
	const commentId=req.params.commentId;
	try{
		const newDelete=await taskData.deleteComment(taskId,commentId);
		res.status(200).json(newDelete);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});
module.exports = router;