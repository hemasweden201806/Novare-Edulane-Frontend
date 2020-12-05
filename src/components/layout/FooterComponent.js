import React, { useState } from 'react';
// Chat Bot
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../chatbot-resources/ActionProvider';
import MessageParser from '../../chatbot-resources/MessageParser';
import config from '../../chatbot-resources/config';
import { Button } from '@material-ui/core';


const FooterComponent = () => {
  const [botOpen, setBotOpen] = useState(false);


  return (
    <div>
      <footer className="footer">
        <Button onClick={() => setBotOpen(!botOpen)} variant="contained" color="primary">
          Bot
        </Button>
        {botOpen ? (
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        ) : null}
        <span className="text-center">CLass Room Todo 2020</span>
      </footer>
    </div>
  );
};

export default FooterComponent;
