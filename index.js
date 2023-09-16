const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const port = 3050;

const io = socketio(server);
app.use(cors());
let msg = {};
const setMsg = (data)=>{
   data? console.log(data):"data not come"
    return msg;
}

io.on("connection", (socket) => {
    console.log("user connected");

    // message emitter
    const msgSender = (data) => {
        socket.emit("messageEmitter",data);
    } 
   
    // message catcher
    socket.on("messageCatcher", (data) => {
        // data is message
        // console.log(data)
        msgSender(data)
        setMsg(data)
    })
  setMsg();
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
})