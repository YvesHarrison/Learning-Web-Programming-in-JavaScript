const fileData = require("./fileData");
const textMetrics = require("./textMetrics");
  
async function main(path){
    let name=path.substr(0,path.length-3)+"result.json";  
    let flag=true;
    let data;
    try{
        data=await fileData.getFileAsJSON(name);
        console.log(data);
    }
    catch(e){
        //console.log(e);
        data = await fileData.getFileAsString(path);  
        data = textMetrics.createMetrics(data);
        console.log(name);
        console.log(data);
        fileData.saveJSONToFile(name,data);
    }
    
}
main("chapter1.txt");
main("chapter2.txt");
main("chapter3.txt");