<Grid sx={{ py: 1 }} container justifyContent="center">
  <Typography variant="h6">Welcome to</Typography>
  <Typography variant="h3">BombChat</Typography>
  <Grid sx={{ py: 1 }} justifyContent="center">
    <CardContent>
      <Grid sx={{ py: 1 }} container justifyContent="center">
        <Typography gutterBottom>BombChat - ID</Typography>
      </Grid>
      <Grid>
        <Typography>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>Me:</strong>
              {msg}
            </p>
          ))}
        </Typography>
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
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        sx={{ m: 1 }}
      />
    </CardActions>
  </Grid>
</Grid>;
