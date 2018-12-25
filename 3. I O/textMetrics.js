const createMetrics=function createMetrics(text) {
    if (text==undefined) {
        throw "Parameter text is not provided!";
    }
    if (typeof(text)!='string') {
        throw "Parameter text is not a string!";
    }
    let totalLetters=totalNonLetters=totalVowels=totalConsonants=totalWords=uniqueWords=longWords=averageWordLength=pos=0;
    let code;
    let word=new Array();
    text=text.toLowerCase();
    for(let i=0;i<text.length;++i){
        code=text[i].charCodeAt();
        if((code>=65&&code<=90)||(code>=97&&code<=122)){
            totalLetters++;
            if(text[i]=="A"||text[i]=="a"||text[i]=="E"||text[i]=="e"||text[i]=="I"||text[i]=="i"||text[i]=="O"||text[i]=="o"||text[i]=="U"||text[i]=="u")totalVowels++;
            else totalConsonants++;
        }
        else totalNonLetters++;
    }
    let wordOccurrences={};
    for(i=0;i<text.length;++i){
        code=text[i].charCodeAt();
        if((code>=65&&code<=90)||(code>=97&&code<=122)){
            for(let j=i+1;j<text.length;++j){
                if(text[j]=="'"&&text[j+1].charCodeAt()>=97&&text[j+1].charCodeAt()<=122)continue;
                code=text[j].charCodeAt();
                if((code>=65&&code<=90)||(code>=97&&code<=122)&&j!=text.length-1)continue;
                if(j==text.length-1&&(code>=65&&code<=90)||(code>=97&&code<=122)){
                    word[pos++]=text.substr(i,j-i+1);
                    if(!wordOccurrences.hasOwnProperty(word[pos-1])){
                        uniqueWords++;
                        wordOccurrences[word[pos-1]]=1;
                    }
                    else wordOccurrences[word[pos-1]]++;
                    averageWordLength+=(j-i+1);
                    if(j-i+1>=6)longWords++;
                    i=j;
                    break;
                }
                else{
                    word[pos++]=text.substr(i,j-i);
                    if(!wordOccurrences.hasOwnProperty(word[pos-1])){
                        uniqueWords++;
                        wordOccurrences[word[pos-1]]=1;
                    }
                    else wordOccurrences[word[pos-1]]++;
                    averageWordLength+=(j-i);
                    if(j-i>=6)longWords++;
                    i=j;
                    break;
                }
            }
        }
    }
    totalWords=word.length;
    averageWordLength/=totalWords;
    let res={
        "totalLetters":totalLetters,
        "totalNonLetters":totalNonLetters,
        "totalWords":totalWords,
        "totalVowels":totalVowels,
        "totalConsonants":totalConsonants,
        "uniqueWords":uniqueWords,
        "longWords":longWords,
        "averageWordLength":averageWordLength,
        "wordOccurrences":wordOccurrences
    };
    return res;
}



module.exports = {
    description: "",
    firstName: "Xinzhe", 
    lastName: "Li", 
    createMetrics
};
//console.log(createMetrics("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo! 2 3 4 23"));
//console.log(createMetrics("No, I can't love you!"));
//createMetrics("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo!");

