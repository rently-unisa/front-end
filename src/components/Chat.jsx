import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
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
        orarioInvio: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        idUtente1: props.idEmittente,
        idUtente2: props.idRicevente,
      };
      addMessage(newMessage);
      setMessages(getMessagesByUserId(props.idEmittente));
      setNewText("");
      console.log(newMessage);
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
        <div>
          {messages.map((message) => (
            <p
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
        <div>
          <textarea
            type="textarea"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Scrivi un messaggio"
          />
          <button onClick={handleSubmitMessage}>
            <SendRoundedIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Chat;
