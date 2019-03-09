const express = require("express");
const router = express.Router();
const task = require("../data/tasks");
const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
const Promise = bluebird.Promise;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/people/history",async(req,res)=>{
	try{
		let data = await client.getAsync("Recent");
		//console.log(data);
		res.status(200).json(data);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.get("/people/:id",async(req,res)=>{
	try{
		let ID = req.params.id;
		//console.log(ID);
		let data,exist;
		exist = await client.existsAsync(ID);
		//console.log("exist",exist);
		if(exist===1){
			data = await client.getAsync(ID);
			//console.log(data);
			data = JSON.parse(data);
		} 
		else{
			data = await task.getById(ID);
			//console.log(JSON.stringify(data));
			await client.setAsync(ID,JSON.stringify(data));
			//console.log(0);
		}
		//data = await task.getById(ID);
		let len = await client.existsAsync("Recent");
			if(len==0){
				let a = new Array();
				a.push(data);
				await client.setAsync("Recent",JSON.stringify(a));
			}
			else{
				list = await client.getAsync("Recent");
				list = JSON.parse(list);
				if(list.length<20){
					//console.log(list);
					list.push(data)
					//console.log("after",list);
					await client.setAsync("Recent",JSON.stringify(list));
				}
				else{
					list.splice(0,1); 
					list.push(data)
					await client.setAsync("Recent",JSON.stringify(list));
				}	
			}

		res.status(200).json(data);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});



module.exports = router;