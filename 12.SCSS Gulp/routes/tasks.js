const express = require("express");
const router = express.Router();

router.get("/tasks",async(req,res)=>{
	try{

		res.status(200).json({info:"good"});
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});


module.exports = router;