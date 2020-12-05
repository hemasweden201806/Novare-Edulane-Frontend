import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './services/Auth';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// Chat Bot
import Chatbot from 'react-chatbot-kit';
import ActionProvider from './chatbot-resources/ActionProvider';
import MessageParser from './chatbot-resources/MessageParser';
import config from './chatbot-resources/config';
/// Import pages
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/home/HomePage';
import Chat from './components/chat/Chat';
import LiveVideo from './components/live/LiveVideo/LiveVideo';
import Userprofile from './components/userprofile/UserProfile';
import Calendar from './components/calendar/Calendar';
import LecturePage from './components/lecture/LecturePage';
import AssignmentPage from './components/assignment/AssignmentPage';
import FileStoragePage from './components/filestorage/FileStoragePage';
import PrivChatHandler from './components/chat-priv/PrivChatHandler';
import PrivChatInbox from './components/chat-priv/PrivChatInbox';
import PrivChatThread from './components/chat-priv/PrivChatThread';
import TodoCreateComponent from './components/todo/TodoCreateComponent';
import TodoListComponent from './components/todo/TodoListComponent';


function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const [conversations, setConversations] = useState([]);
  Auth.bindLoggedInStateSetter(setLoggedIn);

  const loggedInRouter = (
    <Router>
      <PrivChatHandler
        conversations={conversations}
        setConversations={setConversations}
      />
      <Navbar onLogout={() => Auth.logout()} />
      <div className="container mt-5">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/lectures" exact>
            <LecturePage />
          </Route>
          <Route path="/assignments" exact>
            <AssignmentPage />
          </Route>
          <Route path="/chat" exact>
            <Chat />
          </Route>
          <Route path="/bot" exact>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </Route>
          <Route path="/live">
            <LiveVideo />
          </Route>
          <Route path="/filestorage">
            <FileStoragePage />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/userprofile">
            <Userprofile />
          </Route>
          <Route path="/private-messaging">
            <PrivChatInbox conversations={conversations} />
          </Route>
          <Route path="/chat-thread/:receiverName">
            <PrivChatThread conversations={conversations} />
          </Route>
          <Route path="/todo-list">
            <TodoListComponent />
          </Route>
          <Route path="/todo-form">
            <TodoCreateComponent />
          </Route>
        </Switch>
      </div>
      {/* <Footer /> */}
    </Router>
  );

  return loggedIn ? loggedInRouter : <LoginPage />;
}

export default App;
