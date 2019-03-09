const express=require("express");
const app=express();
const configRoutes=require("./routes");
const bodyParser = require("body-parser");
let redis = require("redis");
let client = redis.createClient(6379,'127.0.0.1');

app.use(bodyParser.json());
configRoutes(app);

client.info(function(err,response){
    console.log("redis connect with error: ", err);
});

app.listen(3000,()=>{
	console.log("We've got a server!");
	console.log("Your routes will be running on http://localhost:3000");
});