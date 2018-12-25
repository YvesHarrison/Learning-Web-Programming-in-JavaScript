function deepEquality(obj1, obj2) {
    if (obj1==undefined) {
        throw "Parameter obj1 is not provided!";
    }
    if (obj2==undefined) {
        throw "Parameter obj2 is not provided!";
    }
    if (typeof(obj1)!='object') {
        throw "Parameter obj1 is not a object!";
    }
    if (typeof(obj2)!='object') {
        throw "Parameter obj2 is not a object!";
    }
    let obj1keys=Object.keys(obj1);
    let obj2keys=Object.keys(obj2);
    let obj1values=Object.values(obj1);
    let obj2values=Object.values(obj2);
    // console.log(obj1keys.length,obj2keys.length);
    if(obj1keys.length!=obj2keys.length)return false;
    for(let i=0;i<obj1keys.length;++i){
        if(typeof(obj1[obj1keys[i]])==='object'&&typeof(obj2[obj1keys[i]])==='object'){
            // return deepEquality(obj1[obj1keys[i]], obj2[obj1keys[i]]);
            let deep=deepEquality(obj1[obj1keys[i]], obj2[obj1keys[i]]);
            if(!deep)return false;
        }
        else{
            if(obj1[obj1keys[i]]!=obj2[obj1keys[i]])return false;
        }
    }
    return true;
}

function uniqueElements(arr) { 
    if (arr==undefined) {
        throw "Parameter arr is not provided!";
    }
    if (Object.prototype.toString.call(arr) != '[object Array]') {
        throw "Parameter arr is not a array!";
    }
   let obj={};
   let num=0;
   for(let i=0;i<arr.length;++i){
        if(!obj.hasOwnProperty(arr[i])){
            obj[arr[i]]=1;
            num++;
        }
   }
   return num;
}

function countOfEachCharacterInString(str) {
    if (str==undefined) {
        throw "Parameter str is not provided!";
    }
    if (typeof(str)!='string') {
        throw "Parameter str is not a string!";
    }
    let obj={};
    for(let i=0;i<str.length;++i){
        if(!obj.hasOwnProperty(str[i]))obj[str[i]]=1;
        else obj[str[i]]++;
    }
    return obj;
}

module.exports = {
    description: "This is a geometry.js for CS-546 lab2",
    firstName: "Xinzhe", 
    lastName: "Li", 
    studentId: "10434405",
    deepEquality,
    uniqueElements,
    countOfEachCharacterInString,
};

// const first = {a: 2, b: 3};
// const second = {a: 2, d: 4};
// const third = {a: 2, b: {c:3}};
// const fourth = {a: 2, b: 3, c: 5};
// const fifth={b: 3,a: 2};
// const sixth = {a: 2, b: {c:3}};
// const seventh = {a: 2, b: {c:{e:3,f:4},d:4}};
// const eighth = {b: {c:{e:3,f:4},d:4},a: 2};
// const nineth = {a: 2, b: {c:{e:3,f:4},d:4},m:15};
// const tenth = {a: 2, b: {c:{e:3,f:4},d:4},m:16};
// // console.log(deepEquality(first, second));
// // console.log(deepEquality(first, fifth)); 
// // console.log(deepEquality(first, third));  
// console.log(deepEquality(sixth, third)); 
// console.log(deepEquality(seventh, third)); 
// console.log(deepEquality(seventh, eighth)); 
// console.log(deepEquality(nineth, tenth)); 
// const first = {a: 2, b: 3};
// const second = {a: 2, b: 4};
// const third = {a: 2, b: 3};
// console.log(deepEquality(first, second)); // false
// console.log(deepEquality(first, third)); // true

// const testArr = ["a", "a", "b", "a", "b", "c"];
// console.log(uniqueElements(testArr)); // outputs 3

// const test = "Hello, the pie is in the oven";
// const charMap = countOfEachCharacterInString(test);

// for(let s in charMap){
//     console.log(s,charMap[s]);
// }

//console.log(uniqueElements(123)); 