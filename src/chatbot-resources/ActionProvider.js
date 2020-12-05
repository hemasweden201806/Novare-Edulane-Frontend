// ActionProvider starter code
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
   //This provides the state of the greeting. 
   //How do we inititate the greet() and handleJavaScriptList here in the first phase?
    handlegreet() {
      const greetingMessage = this.createChatBotMessage("Hi, friend...............")
      this.updateChatbotState(greetingMessage)
    }
    handleJavascriptList = () => {
      const message = this.createChatBotMessage(
        "Fantastic, I've got the following resources for you on Javascript:",
        {
          widget: "javascriptLinks",
        }
      );
      this.updateChatbotState(message);
    };
  
    
    //This method updates the state of the bot.
    updateChatbotState(message) {
   
  // NOTE: This function is set in the constructor, and is passed in      // from the top level Chatbot component. The setState function here     // actually manipulates the top level state of the Chatbot, so it's     // important that we make sure that we preserve the previous state.
   
      
     this.setState(prevState => ({
          ...prevState, messages: [...prevState.messages, message]
      }))
    }
  }
  export default ActionProvider;