const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

let userList = [];

io.on('connection', (socket) => {
    // console.log(socket.id + ' connected!!!!');
    socket.on("userConnected", (userName) => {
        let userObj = { id: socket.id, userName: userName };
        userList.push(userObj);
        // console.log(userList);
        
        socket.emit("online-list", userList);
        
        socket.broadcast.emit("join", userObj);
    })

    socket.on("disconnect", () => {
        let leftUserObj;
        let remainingUser = userList.filter((userObj) => {
            if (userObj.id == socket.id) {
                leftUserObj = userObj;
                return false;
            }
            return true;
        })
        userList = remainingUser;
        socket.broadcast.emit("userDisconnected", leftUserObj);
    })

    socket.on("sentMessage", (message, userName) => {
        let sendingUser;
        let recivingUser = userList.filter((userObj) => {
            if (userObj.userName == userName) {
                sendingUser = userObj;
                return false;
            }
            return true;
        })
        userList = recivingUser;
        socket.broadcast.emit("showChat", userName, message);
        userList.push(sendingUser);
    })
});

let port = process.env.PORT || 3000;

server.listen(port, () => {
    // console.log('listening on *:5500');
});