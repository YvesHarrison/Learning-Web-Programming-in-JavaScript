const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));
const path = './data/lab5.json';

function check(num){
    return !isNaN(parseFloat(num))&&isFinite(num);
}

function get(data,id){
    for(let i=0;i<data.length;++i){
        if(Number(id) == Number(data[i].id))return data[i];
    }
    return false;
}

const exportedMethods={
    async getById(id){
        if(!check(id)) throw("Unexpected data type of id");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let data = fs.readFileSync(path, 'utf8');
                
                data = JSON.parse(data);
                let project = get(data,id);

                if (project) {
                    resolve(project);
                } else {
                    reject(new Error("something went wrong"));
                }
            }, 5000);
        });
    }
}

module.exports = exportedMethods;
