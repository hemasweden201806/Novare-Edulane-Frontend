/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as Scroll from 'react-scroll';
import { v4 as uuid } from 'uuid';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatMessage from './ChatMessage';
import { Fab, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { format } from 'date-fns';

const wsEndpoint = 'http://localhost:8080/ws';

function Chat() {
  const user = window.sessionStorage.getItem('user');
  const [messages, setMessages] = useState([]);
  const [messageField, setMessageField] = useState('');
  const scroll = Scroll.animateScroll;
  let stompClient = null;

  useEffect(() => {
    const socket = new SockJS(wsEndpoint, null, {
      transports: ['xhr-streaming'],
      headers: { Authorization: window.sessionStorage.getItem('_token') }
    });
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    // Disconnect the socket connection when component un-mounts.
    return () => stompClient.disconnect();
  }, []);

  function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);
    console.log(stompClient);

    //Send Username To Server
    stompClient.send(
      '/app/chat.addUser',
      {},
      JSON.stringify({ sender: user, type: 'JOIN' })
    );
  }

  function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    if (message.type === 'JOIN') {
      message.content = 'Joined!';
    } else if (message.type === 'LEAVE') {
      message.content = 'Left!';
    }
    message.time = format(new Date(), 'HH:mm');
    setMessages(oldMessages => [...oldMessages, message]);
    scroll.scrollToBottom();
  }

  function sendMessage(event) {
    event.preventDefault();
    if (messageField && stompClient) {
      const chatMessage = {
        sender: user,
        content: messageField,
        type: 'CHAT'
      };
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
    }
    setMessageField('');
  }

  function onError() {
    console.log('error');
  }

  const messagesToRender = messages.map(msg => {
    return <ChatMessage key={uuid()} message={msg} />;
  });

  return (
    <div className="paper">
      <div className="jsx-messages">{messagesToRender}</div>
      <form
        onSubmit={event => sendMessage(event)}
        className="message-form"
        noValidate
        autoComplete="off">
        <TextField
          className="message-text-field"
          id="outlined-full-width"
          placeholder="Type a message..."
          helperText="Enter or Click to send."
          fullWidth
          margin="normal"
          onChange={e => setMessageField(e.target.value)}
          value={messageField}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <Fab size="small" onClick={event => sendMessage(event)}>
          <Send />
        </Fab>
      </form>
    </div>
  );
}

export default Chat;
