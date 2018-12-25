const myForm = document.getElementById("myForm");

if (myForm) {
    const textInput = document.getElementById("text_input");

    myForm.addEventListener("submit", event => {

        event.preventDefault();
        
        if (textInput.value) {
            //we hide the error div in case it's visible
            $("#error").hide();
            let input=textInput.value

            let input_low=input.toLowerCase();
            let arr =new Array();
            let re_arr=new Array();
            let len=0;
            for(let i=0;i<input_low.length;++i){
                let code=input_low[i].charCodeAt();
                if((code>=65&&code<=90)||(code>=97&&code<=122)||(input_low[i]>="0"&&input_low[i]<="9")){
                    arr[len]=input_low[i];
                    re_arr[len]=input_low[i];
                    len++;
                }
            }
            
            re_arr.reverse();
            let s=arr.join("");
            let r_s=re_arr.join("");
            if(r_s===s){
                const li = `<li class="is-palindrome"> ${textInput.value} </li>`
                $("#attempts").append(li);
            }
            else{
                const li = `<li class="not-palindrome"> ${textInput.value} </li>`
                $("#attempts").append(li);
            }
            $("#myForm").trigger('reset');
            $('#text_input').focus();
        } else {
            //If the user did not enter input, we show the error div and text
            $("#error").show();
            $("#error").html("Error You Need to supply an input value!");
            $('#text_input').focus();
        }

    });
 }