const express = require("express");
const router = express.Router();
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const len = 16;

const users = [
  { _id:"1245325124124",
  	username: "masterdetective123",
  	hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.", 
  	firstName: "Sherlock", 
  	lastName: "Holmes", 
  	Profession:"Detective", 
  	bio:"Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard." 
  	},
  	{ _id:"723445325124124",
  	username: "lemon", 
  	hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm", 
  	firstName: "Elizabeth", 
  	lastName: "Lemon", 
  	Profession:"Writer", 
  	bio:"Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan." 
  	}, 
  	{ _id:"123456789101112",
  	username: "theboywholived", 
  	hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK", 
  	firstName: "Harry", 
  	lastName: "Potter", 
  	Profession:"Student", 
  	bio:"Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles."
  	}
]

async function findid(id){
	let user;
	for(let i=0;i<users.length;++i){
		if(id===users[i]._id)user=users[i];
	}
	if(user===undefined)return false;
	else return user;
}

async function findname(name){
	let user;
	for(let i=0;i<users.length;++i){
    //console.log(users[i]);
		if(name===users[i].username)user=users[i];
	}
	if(user===undefined)return false;
	else return user;
}

router.get("/", async (req, res) => {
    try {
  		  if(req.cookies && req.cookies.AuthCookie){
  			   res.redirect("/private");
  		  }
  		  else{
  			   res.render("login",{error:"Not Logged In"});
  		  }
  	} catch (e) {
    	   res.status(500).json({ error: e });
  	}
});


router.post("/login", async (req, res) => {
  	try {
    	//console.log(req);
    	
        let usn=req.body["username"];
        let pwd=req.body["password"];

        //console.log(pwd);
        //console.log(usn);
        let user=await findname(usn); 
        //console.log(user);
        if(user!=false){
            const result = await bcrypt.compare(pwd,user.hashedPassword);
            //console.log(result);
            if(result===true){
                //console.log(Date.now(),Date.now()+900000);
                res.cookie("AuthCookie", user._id, { expires: new Date(Date.now() + 900000) });
                //console.log("login",req.cookies);
                res.redirect("/private");
            }
            else{
                res.render("login",{error:"Invalid password"});
            }
        }
        else{
            res.render("login",{error:"Invalid user name or password"});
        }
  	} catch (e) {
    	   res.status(500).json({ error: e });
  	}
});

router.get("/private", async (req, res) => {
  	try {
        //console.log("private",req.cookies);
        if(req.cookies && req.cookies.AuthCookie){
    		    let user= await findid(req.cookies.AuthCookie);
            //console.log(user);
  			    res.render("private",{username:user.username,firstname:user.firstName,lastname:user.lastName,profession:user.Profession,bio:user.bio});
  		  }
  		  else{
  			   res.status(403).render("error");
  		  }
  	} catch (e) {
    	  res.status(500).json({ error: e });
  	}
});

router.get("/logout", async (req, res) => {
	  try {
  		  res.clearCookie("AuthCookie");
    	  res.redirect("/");
  	} catch (e) {
    	  res.status(500).json({ error: e });
  	}
});
	




module.exports = router;