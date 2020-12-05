import { Avatar, Box, Paper } from '@material-ui/core';
import React from 'react';

function ChatMessage({ message }) {
  const user = window.sessionStorage.getItem('user');
  const { sender, content, time } = message;
  const senderOrUser = sender === user ? 'user' : 'sender';

  return (
    <Paper elevation={3}>
      <Box
        className={`message-body message-box-${senderOrUser}`}
        color="primary.contrastText">
        <Avatar className={`message-avatar-${senderOrUser}`}>{sender.charAt(0)}</Avatar>
        <div className="message-sender">{sender}</div>
        <div className="message-content">{content}</div>
        <div className="message-time">{time}</div>
      </Box>
    </Paper>
  );
}

export default ChatMessage;
