import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
  TextField,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";

const Room = () => {
  const { roomId } = useParams();
  const [remainingTime, setRemainingTime] = useState(600);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const messagesContainerRef = useRef(null);
  const socketRef = useRef(null);
  const [connectedUsers, setConnectedUsers] = useState(0);

  // Connect to the Socket.io server
  useEffect(() => {
    socketRef.current = io("http://192.168.15.12:8080");

    
    socketRef.current.on("a", (data) => {
      console.log("Received welcome message:", data);
    });

    socketRef.current.on("connect", () => {
      console.log("Socket.io connection established");
      console.log("socketRef.current", socketRef.current);
      
      setIsConnected(true);
    });
    socketRef.current.on("message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socketRef.current.on("connectedUsers", (connectedUsers) => {
      console.log("Connected users:", connectedUsers);
      setConnectedUsers(connectedUsers);
    });
    socketRef.current.on("error", (error) => {
      console.error("Socket.io error:", error);
    });
    socketRef.current.on("disconnect", () => {
      console.log("Socket.io connection closed");
      setIsConnected(false);
    });
    return () => {
      socketRef.current.close();
    };
  }, []);

  // Set the room interval
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Exits after timeout
  useEffect(() => {
    if (remainingTime === 0) {
      setTimeout(() => {
        sessionStorage.clear();
        navigator.clipboard.writeText("Thanks for using BombChat :)");
        window.location.href = "/";
      }, 1500);
    }
  }, [remainingTime]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // Send the message to the WebSocket server
  const sendMessage = () => {
    if (message.trim() !== "") {
      socketRef.current.send(message);
      setMessage("");
    }
  };

  const share = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    alert(`URL copied to clipboard. Now just paste it!`);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <Grid
      sx={{
        position: "absolute",
        m: 1,
        p: 1,
        top: 0,
      }}
      container
      justifyContent="center"
    >
      {/* Display the connection status */}

      <Grid>
        <Typography variant="h6">Hey yo it's just another</Typography>
      </Grid>
      <Grid sx={{ pb: 1 }} container justifyContent="center">
        <Typography variant="h3">💣 BombChat 💬</Typography>
      </Grid>
      <Grid
        sx={{
          minWidth: "65%",
        }}
      >
        <CardContent>
          <Grid container justifyContent="center">
            <Typography sx={{ m: 1, pt: 1 }}>Room ID: {roomId}</Typography>
            <Button
              variant="contained"
              endIcon={<ShareIcon />}
              onClick={share}
              sx={{
                m: 1,
                backgroundColor: "#383838",
                "&:hover": {
                  backgroundColor: "#383838",
                },
              }}
            >
              Share
            </Button>
          </Grid>

          <Grid container justifyContent="center">
            <Typography sx={{ m: 1 }}>
              {isConnected ? (
                <span style={{ color: "green" }}>
                  <Typography sx={{ m: 1 }}>
                    {connectedUsers} {connectedUsers === 1 ? "user" : "users"}{" "}
                    connected
                  </Typography>
                </span>
              ) : (
                <span style={{ color: "red" }}>Disconnected</span>
              )}
            </Typography>
          </Grid>

          <Grid container justifyContent="center">
            <Typography variant="body1">
              This room is alive for: {remainingTime} seconds
            </Typography>
          </Grid>
          <Grid>
            <Box
              ref={messagesContainerRef}
              sx={{
                border: 3,
                borderColor: "#1976D2",
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                height: "25vw",
                overflow: "auto",
              }}
            >
              <Typography component="div">
                {messages.map((msg, index) => (
                  <Typography
                    key={index}
                    sx={{
                      m: 3,
                      backgroundColor: "#efefef",
                      borderRadius: 3,
                      p: 1,
                    }}
                  >
                    <strong>Me:</strong>
                    {msg.split("\n").map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </Typography>
                ))}
              </Typography>
            </Box>
          </Grid>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={sendMessage}
            sx={{ m: 1 }}
          >
            Send
          </Button>
          <TextField
            label="Write a Message"
            multiline
            maxRows={2}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            sx={{ m: 1, width: "100%" }}
          />
        </CardActions>
      </Grid>
    </Grid>
  );
};

export default Room;
