/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { produce } from 'immer';

import PrivChatApi from '../../api/PrivChatApi';

// Helper vars
let eventSource = undefined;

function PrivChatHandler({ conversations, setConversations }) {
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!listening) {
      // Establish Connection
      eventSource = new EventSourcePolyfill(PrivChatApi.stream, {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('_token')
        }
      });
      // Error Received
      eventSource.onerror = event => {
        console.log('Error!', event);
        // eventSource.close();
      };
      // Prevent reconnect if connection is active.
      setListening(true);
    }
    return () => {
      eventSource.close();
      console.log('Closing event source on unmount');
    };
  }, []);

  /*
   *  On message received, save it into an array of messages in component state.
   */
  useEffect(() => {
    eventSource.onmessage = event => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.id !== 'heartbeat') {
        setMessages(existingMessages => [...existingMessages, newMessage]);
      }
    };
  }, []);

  /*
   *  On Each message saved into message state, sort the message into an array of senders
   *  If array for that sender does not yet exist, create it.
   *  Array of senders is saved to state in App.jsx using a passed down setter.
   */
  useEffect(() => {
    messages.forEach(msg => {
      const immerState = produce(conversations, draftState => {
        if (draftState.find(thread => thread.receiverName === msg.receiverName)) {
          const foundThread = draftState.find(
            thread => thread[`receiverName`] === msg.receiverName
          );
          foundThread.thread.push(msg);
          foundThread.timeStamp = performance.now();
        } else {
          const newThread = {
            receiverName: msg.receiverName,
            thread: [msg],
            timeStamp: performance.now()
          };
          draftState.push(newThread);
        }
      });
      setConversations(immerState);
    });
  }, [messages]);

  return <></>;
}

export default PrivChatHandler;
