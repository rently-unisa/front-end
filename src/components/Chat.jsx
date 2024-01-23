import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addMessage, getMessagesByUsersId } from "../services/messaggi";
import dayjs from "dayjs";
import "../style/Chat.css";
import { Alert, Box, Snackbar } from "@mui/material";

function Chat(props) {
  const [newText, setNewText] = useState("");
  const [messages, setMessages] = useState(props.messages);
  const [alertState, setAlertState] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAlert = (state, message) => {
    setAlertState(state);
    setAlertMessage(message);
    handleClick();
  };

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
          handleAlert("error", "C'è stato un problema nel caricare la chat");
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
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={alertState}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
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
