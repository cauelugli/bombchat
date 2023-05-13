export const generateRoomId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";
    const length = 24;
    let roomId = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      roomId += characters.charAt(randomIndex);
    }
    return roomId;
  };
  
  export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  