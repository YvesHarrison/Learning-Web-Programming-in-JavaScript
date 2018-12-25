const geometry = require("./geometry");
const utilities = require("./utilities");

console.log("result for volumeOfRectangularPrism");
try {
  console.log(geometry.volumeOfRectangularPrism(1,2,3));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.volumeOfRectangularPrism(1,2,));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.volumeOfRectangularPrism(1,2,-3));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.volumeOfRectangularPrism(1,2,"a"));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.volumeOfRectangularPrism(1,"b",3));
}
catch(e) {
  console.log(e);
}
console.log("result for surfaceAreaOfRectangularPrism");
try {
  console.log(geometry.surfaceAreaOfRectangularPrism(1,2,3));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.surfaceAreaOfRectangularPrism(1,2,));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.surfaceAreaOfRectangularPrism(1,2,-3));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.surfaceAreaOfRectangularPrism(1,2,"a"));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.surfaceAreaOfRectangularPrism(1,"b",3));
}
catch(e) {
  console.log(e);
}

console.log("result for volumeOfSphere");
try {
  console.log(geometry.volumeOfSphere(1));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.volumeOfSphere(5));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.volumeOfSphere(4.5));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.volumeOfSphere());
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.volumeOfSphere("a"));
}
catch(e) {
  console.log(e);
}

console.log("result for surfaceAreaOfSphere");
try {
 console.log(geometry.surfaceAreaOfSphere(1));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.surfaceAreaOfSphere(5));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.surfaceAreaOfSphere(4.5));
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.surfaceAreaOfSphere());
}
catch(e) {
  console.log(e);
}
try {
  console.log(geometry.surfaceAreaOfSphere("a"));
}
catch(e) {
  console.log(e);
}

const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const fourth = {a: 2, b: 3, c: 5};
const fifth={b: 3,a: 2};
console.log("result for deepEquality");
try {
 console.log(utilities.deepEquality(first, fifth)); // false

}
catch(e) {
  console.log(e);
}
try {
 console.log(utilities.deepEquality(first, third)); // true
}
catch(e) {
  console.log(e);
}
try {
  console.log(utilities.deepEquality(first,"a")); // error
}
catch(e) {
  console.log(e);
}
try {
  console.log(utilities.deepEquality(first, )); // error
}
catch(e) {
  console.log(e);
}
try {
 console.log(utilities.deepEquality(first, fourth)); // false
}
catch(e) {
  console.log(e);
}
const testArr = ["a", "a", "b", "a", "b", "c"];
const testArr1 = ["a", "a", "b", "a", "b", "c", "d", "e"];
console.log("result for uniqueElements");
try {
 console.log(utilities.uniqueElements(testArr)); // 3

}
catch(e) {
  console.log(e);
}
try {
 console.log(utilities.uniqueElements()); // error
}
catch(e) {
  console.log(e);
}
try {
  console.log(utilities.uniqueElements("a")); // error
}
catch(e) {
  console.log(e);
}
try {
  console.log(utilities.uniqueElements(first)); // error
}
catch(e) {
  console.log(e);
}
try {
 console.log(utilities.uniqueElements(testArr1)); // 5
}
catch(e) {
  console.log(e);
}

const test = "Hello, the pie is in the oven";
console.log("result for countOfEachCharacterInString");
try {
 console.log(utilities.countOfEachCharacterInString(test));

}
catch(e) {
  console.log(e);
}
try {
 console.log(utilities.countOfEachCharacterInString());
}
catch(e) {
  console.log(e);
}
try {
  console.log(utilities.countOfEachCharacterInString("a")); // error
}
catch(e) {
  console.log(e);
}
try {
  	console.log(utilities.countOfEachCharacterInString(123)); // error
}
catch(e) {
  	console.log(e);
}
try {
 	console.log(utilities.countOfEachCharacterInString(testArr)); // false
}
catch(e) {
  	console.log(e);
}
