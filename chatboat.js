module.exports  = {

    replyToChat(message){
        console.log(message)
        message = message.toLowerCase();
        if(message.includes("hello") || message.includes("hi")){
            return "Hello";
        }
        else if(message.includes("how are you")){
            return "I am fine How are you?";
        }
        else if(message.includes("fine")){
            return "How can i help you?"
        }
        else if(message.includes("need") && message.includes("help")){
            return "Yes i am available for help"
        }
        else if(message.includes("by")){
            return "Thank you Bye."
        }
        else{
            return "I am not getting";
        }
    }
}

