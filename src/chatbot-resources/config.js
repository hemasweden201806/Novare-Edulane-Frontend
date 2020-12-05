/* // Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: "LearningBot",
  initialMessages: [createChatBotMessage(`Hello world`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  
}

export default config; */
import React from "react";
 import { createChatBotMessage } from "react-chatbot-kit";
import LearningOptions from "../components/chatbot/LearningOptions";
import Linklist from "../components/chatbot/Linklist"
const config = {

  //1.We created the LearningOptions component.
//2.We registered the component under widgets in our config.
//3.We gave the createChatbotMessage function an options object specifying which widget to render with this message.t a name and changed the color of the messagebox and chatbutton components.

  botName :"LearningBot",

 initialMessages: [
     createChatBotMessage("Hi, I'm here to help. What do you want to 		learn?", {
     widget: "LearningOptions",
   }),
  ],
 
  //We are using the Widgets inside the config file and this allows us room to decorate the widget with important properties inside the chatbot
 widgets: [
  {
    widgetName: "LearningOptions",
   widgetFunc: (props) => <LearningOptions {...props} />,
  },
  {
    widgetName: "javascriptLinks",
    widgetFunc: (props) => <Linklist {...props} />,
    props: {
      options: [
        {
          text: "Introduction to JS",
          url:
            "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
          id: 1,
        },
        {
          text: "Mozilla JS Guide",
          url:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          id: 2,
        },
        {
          text: "Frontend Masters",
          url: "https://frontendmasters.com",
          id: 3,
        },
      ],
    },
  },
],
};

export default config;