const bluebird = require("bluebird");
const Promise = bluebird.Promise;

// We use bluebird to make a copy of fs
// that has all its normal methods, and
// {methodName}Async method versions that return
// promises as well; ie, you will have a copy
// of fs with fs.stat(path, callback) and
// fs.statAsync(path), which returns a promise
// thus allowing us to await it.
const fs = bluebird.promisifyAll(require("fs"));

async function getFileAsString(path) {
    if (!path) throw "You must provide a path";
    // return new Promise((resolve,reject)=>{
    //     fs.readFileAsync(path, 'utf8',(error,data)=>{
    //         if(error)reject(error);
    //         else resolve(data);
    //     });
    // });
    const data= await fs.readFileAsync(path, 'utf8');
    return data;
}

async function getFileAsJSON(path) {
    if (!path) throw "You must provide a path";
    // return new Promise((resolve,reject)=>{
    //     fs.readFileAsync(path, 'utf8',(error,data)=>{
    //         if(error)reject(error);
    //         else resolve(data);
    //     });
    // });
    let data= await fs.readFileAsync(path, 'utf8');
    data=JSON.parse(data)
    return data;
}

async function saveStringToFile(path, text) {
    if (!path) throw "You must provide a path";
    if (!text) throw "You must provide a text";
    // return new Promise((resolve, reject) => {
    //     fs.writeFile(path, text, (error, text) => {
    //         if (error) reject(error); 
    //         else resolve(text);
    //     })
    // })
    return await fs.writeFileAsync(path,text);
}

async function saveJSONToFile(path, obj) {
    if (!path) throw "You must provide a path";
    if (!obj) throw "You must provide a object";
    if (typeof(obj)!='object') {
        throw "Parameter obj is not a object!";
    }
    obj=JSON.stringify(obj);
    // return new Promise((resolve, reject) => {
    //     fs.writeFile(path, obj, (error, obj) => {
    //         if (error) reject(error); 
    //         else resolve(obj);
    //     })
    // })
    return await fs.writeFileAsync(path,obj);
}

module.exports = {
    description: "",
    firstName: "Xinzhe", 
    lastName: "Li", 
    getFileAsString,
    getFileAsJSON,
    saveStringToFile,
    saveJSONToFile
};

// async function main() {
//     // We can await this; if it throws / rejects
//   //const res = await getFileAsJSON("chapter1.result.json");
//   const res = await getFileAsString("chapter1.txt");
//   console.log(res);
//   //saveJSONToFile("1.txt", res);
//   saveStringToFile("1.txt", res);
// }
// main();
