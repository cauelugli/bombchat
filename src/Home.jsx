import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Grid } from "@mui/material";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { generateRoomId, copyToClipboard } from "./utils";

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleCreateRoom = () => {
    if (isCreatingRoom) {
      return;
    }

    const newRoomId = generateRoomId();
    copyToClipboard(newRoomId);
    setRoomId(newRoomId);
    setIsCreatingRoom(true);
    setRemainingTime(30);

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          setIsCreatingRoom(false);
          clearInterval(intervalId);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleJoin = () => {
    navigate(`/room/${roomId}`);
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
      <Grid>
        <Typography variant="h6">Hey yo it's just another</Typography>
      </Grid>
      <Grid sx={{ p: 1 }} container justifyContent="center">
        <Typography variant="h3">💣 BombChat 💬</Typography>
      </Grid>
      <TextField
        label="Join a Room"
        multiline
        maxRows={2}
        sx={{ m: 1, mt: 10, width: "40%" }}
      />
      <Grid sx={{ p: 1 }} container justifyContent="center">
        <Button
          variant="contained"
          endIcon={<ShortcutIcon />}
          onClick={handleJoin}
          sx={{ m: 1, backgroundColor: "#383838",
          "&:hover": {
            backgroundColor: "#383838",
          } }}
        >
          Join
        </Button>
      </Grid>
      <TextField
        label="Create a Room"
        multiline
        maxRows={2}
        sx={{ m: 1, mt: 3, width: "40%" }}
        disabled={isCreatingRoom}
        value={roomId}
        onChange={() => {}}
      />
      <Grid sx={{ p: 1 }} container justifyContent="center">
        <Button
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          sx={{ m: 1, backgroundColor: "#e81224",
          "&:hover": {
            backgroundColor: "#e81224",
          } }}
          disabled={isCreatingRoom}
          onClick={handleCreateRoom}
        >
          Create
        </Button>
      </Grid>
      {isCreatingRoom && (
        <Grid sx={{ p: 1 }} container justifyContent="center">
          <Typography sx={{ mt: 2 }}>
            Created room, and copied to clipboard: {roomId}
          </Typography>
        </Grid>
      )}
      {remainingTime > 0 && (
        <Grid sx={{ p: 1 }} container justifyContent="center">
          <Typography sx={{ mt: 2 }}>
            You can create a new room in {remainingTime} seconds
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
