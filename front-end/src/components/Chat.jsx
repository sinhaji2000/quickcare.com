import { useState , useEffect } from "react";
import {createSocketConnection} from '../../utils/socket'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
const Chat = () => {

  const [message , setMessage ]= useState({text : "hello World"})  ;
  const {docId} = useParams() ;
  console.log("targetUserId : " , docId)
  // To access the logged-in user in a React component, you typically get it from context, Redux, or a prop.
  // If using JWT, you might store user info in localStorage after login.
  // Example using localStorage:
  
   const user = useSelector((state) => state.logedinUser.user);
   const userId = user?._id
  useEffect(() => {
    if (!userId || !docId) {
      console.error("User ID or Document ID is not available.");
      return;
    }
    const socket = createSocketConnection() ;

    socket.emit('join', { userId , targetUserId : docId})

    return () => {
      socket.disconnect();
    }
  }, [userId, docId]);
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary">
          What kind of nonsense is this
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-secondary">
          Put me on the Council and not make me a Master!??
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-accent">
          That's never been done in the history of the Jedi.
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-neutral">It's insulting!</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-success">
          You have been given a great honor.
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-warning">
          To be on the Council at your age.
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-error">
          It's never happened before.
        </div>
      </div>
    </div>
  );
};

export default Chat;
