import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addMessage, getMessagesByUsersId } from "../services/messaggi";
import dayjs from "dayjs";
import "../style/Chat.css";

function Chat(props) {
  const [newText, setNewText] = useState("");
  const [messages, setMessages] = useState(props.messages);

  useEffect(() => {
    setMessages(props.messages);
  }, [props.messages]);

  const handleSubmitMessage = () => {
    if (newText !== "") {
      const newMessage = {
        id: 0,
        descrizione: newText,
        orarioInvio: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        mittente: props.idEmittente,
        destinatario: props.idRicevente,
      };
      addMessage(newMessage).then((response) => {
        if (!response || response.status !== 201) {
          alert("C'è stato un problema nel caricare la chat");
        } else {
          getMessagesByUsersId(props.idEmittente, props.idRicevente).then(
            (response) => {
              if (response.ok) {
                response.json().then((messages) => {
                  setMessages(messages);
                });
              }
            }
          );
        }
      });
      setNewText("");
    }
  };

  return (
    props.trigger && (
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
          {messages && (
            <div className="messageList">
              {messages
                .sort((a, b) => a.id - b.id)
                .map((message) => (
                  <p
                    style={{ wordWrap: "break-word" }}
                    className={`message ${
                      message.destinatario === props.idRicevente
                        ? "my-message"
                        : "other-message"
                    }`}
                  >
                    {message.descrizione}
                  </p>
                ))}
            </div>
          )}
          <div className="bottomMessageArea">
            <textarea
              className="messageBox"
              type="textarea"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Scrivi un messaggio"
            />
            <button
              className="sendMessage"
              onClick={handleSubmitMessage}
            ></button>
          </div>
        </div>
      </div>
    )
  );
}

export default Chat;
