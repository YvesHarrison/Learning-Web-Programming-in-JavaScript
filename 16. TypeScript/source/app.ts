import express from "express";
const app=express();
const configRoutes = require("./routes");
import bodyParser from "body-parser";

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000,()=>{
	console.log("We've got a server!");
	console.log("Your routes will be running on http://localhost:3000");
});