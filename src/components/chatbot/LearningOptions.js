import React from "react";
import "./LearningOptions.css";



  //The learning options component should be registered with the config file.
  //We can create custom create learning options and render it to the page.
  const LearningOptions = (props) => {
    const options = [
      {
        text: "javascriptLinks",
        handler: props.actionProvider.handleJavascriptList,
        id: 1,
      },
    { text: "React JS", handler: () => {}, id: 2 },
    { text: "APIs", handler: () => {}, id: 3 },
    { text: "Material UI", handler: () => {}, id: 4 },
    { text: "React Hooks and Routers", handler: () => {}, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;