const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", async (req, res) => {
  try {
    res.render("front");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// router.post("/result", async (req, res) => {
//   //console.log(req.body);
//   let input=req.body['test-to-test'];
//   if(input===""){
//     try{
//         res.status(400).render("error",{code:400,description:"No input for palindromes!"});
//         //res.status(400).json({ error: "No input for palindromes!" });
//         //res.status(400).render();
//     }
//     catch(e){
//         console.log(e);
//     }
    
//   }
//   else{
//       //console.log(typeof(input));
//       //console.log(input);
//       let input_low=input.toLowerCase();
//       let arr =new Array();
//       let re_arr=new Array();
//       let len=0;
//       for(let i=0;i<input_low.length;++i){
//           let code=input_low[i].charCodeAt();
//           if((code>=65&&code<=90)||(code>=97&&code<=122)){
//             arr[len]=input_low[i];
//             re_arr[len]=input_low[i];
//             len++;
//           }
//       }
//       //console.log(input,arr);
//       //console.log(arr);
//       re_arr.reverse();
//       //console.log(arr);
//       let s=arr.join("");
//       let r_s=re_arr.join("");
//       //console.log(r_s,s);
//       let ans;
//       if(r_s===s)ans="Success";
//       else ans="Failure";
//       //console.log(input,re);
  
//       try {
//           if(ans==="Success")res.render("result",{input:input,success:ans});
//           else if(ans==="Failure")res.render("result",{input:input,faliure:ans});
//       } catch (e) {
//           res.status(404).json({ message: "no data!" });
//       }
//   }
// });



module.exports = router;