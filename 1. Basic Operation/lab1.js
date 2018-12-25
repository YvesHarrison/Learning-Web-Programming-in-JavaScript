const questionOne = function questionOne(arr) {
    let res=0;
    for(let i=0;i<arr.length;i++){
    	res+=arr[i]*arr[i];
    }
    return res;
}

const questionTwo = function questionTwo(num) { 
    if(num<1)return 0; 
    else if(num===1)return 1;
    else return questionTwo(num-1)+questionTwo(num-2);
}

const questionThree = function questionThree(text) {
    let res=0;
    for(let i=0;i<text.length;i++){
    	if(text[i]=="a"||text[i]=="A"||text[i]=="E"||text[i]=="e"||text[i]=="i"||text[i]=="I"||text[i]=="o"||text[i]=="O"||text[i]=="U"||text[i]=="u")res+=1;
    }
    return res;
}

const questionFour = function questionFour(num) {
    if(num<0) return NaN;
    else if(num===0) return 1;
    else{
        let res=1;
        for(let i=1;i<=num;++i){
            res*=i;
        }
        return res;
    } 
}

module.exports = {
    firstName: "Xinzhe", 
    lastName: "Li", 
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};