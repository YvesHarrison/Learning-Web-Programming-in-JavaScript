const lab1 = require("./lab1");

console.log("result for question1");
console.log(lab1.questionOne([1,3,9]));
//91
console.log(lab1.questionOne([2,4,6]));
//56
console.log(lab1.questionOne([11,10,9,8]));
//366
console.log(lab1.questionOne([1,2,3,4,5,6]));
//91
console.log(lab1.questionOne([5,3,10]));
//134

console.log("result for question2");
console.log(lab1.questionTwo(0));
//0
console.log(lab1.questionTwo(1));
//1
console.log(lab1.questionTwo(2));
//1
console.log(lab1.questionTwo(10));
//55
console.log(lab1.questionTwo(3));
//2
console.log(lab1.questionTwo(12));
//134

console.log("result for question3");
console.log(lab1.questionThree("AEIOUaeiou"));
console.log(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere."));
//196
console.log(lab1.questionThree("Have you downloaded the Canvas app on iOS or Android yet? Be sure to gain access to your learning tools and materials on your mobile device. When logging into Canvas from your mobile application, please search for Stevens Institute of Technology, when prompted in the application, then log in with your MyStevens credentials."));
//103

console.log("result for question4");
console.log(lab1.questionFour(-1));
//NaN
console.log(lab1.questionFour(0));
//1
console.log(lab1.questionFour(5));
//120
console.log(lab1.questionFour(10));
//3628800