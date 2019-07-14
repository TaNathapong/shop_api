exports.initialize = io => {
  io.on("connection", client => {
    console.log("user connected");

    client.on("notify", function(res) {
      io.sockets.emit(`notify-${res.user_id}`, res);
    });
    
    client.on("disconnect", () => console.log("user disconnected"));
  });
};
