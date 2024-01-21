import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addMessage, getMessagesByUserId } from "../services/messaggi";
import "../style/Chat.css";

function Chat(props) {
  const [newText, setNewText] = useState("");
  const [messages, setMessages] = useState();

  useEffect(() => {
    setMessages(getMessagesByUserId(props.idEmittente));
  }, [props.idEmittente]);

  const handleSubmitMessage = () => {
    if (newText !== "") {
      const newMessage = {
        testo: newText,
        orarioInvio: "",
        idUtente1: props.idEmittente,
        idUtente2: props.idRicevente,
      };
      addMessage(newMessage);
      setMessages(getMessagesByUserId(props.idEmittente));
      setNewText("");
    }
  };

  return props.trigger ? (
    <div className="chat">
      <div className="chat-body">
        <div>
          <button
            className="closeButton"
            onClick={() => props.setTrigger(false)}
          >
            <CloseIcon fontSize="small" className="closeIcon" />
          </button>
          <p>Chat con utente</p>
        </div>
        <div className="messageList">
          {messages.map((message) => (
            <p style={{wordWrap: "break-word"}}
              className={`message ${
                message.idUtente1 === props.idEmittente
                  ? "my-message"
                  : "other-message"
              }`}
            >
              {message.testo}
            </p>
          ))}
        </div>
        <div className="bottomMessageArea">
          <textarea className="messageBox"
            type="textarea"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Scrivi un messaggio"
          />
          <button className="sendMessage" onClick={handleSubmitMessage}></button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Chat;
