const ws = require("ws");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const Message = require("../models/messageModel.js");

const chatConnect = (server) => {
    const wss = new ws.WebSocketServer({ server });
    wss.on("connection", (connection, req) => {
        connection.isAlive = true;

        connection.timer = setInterval(() => {
            connection.ping();
            connection.deathTimer = setTimeout(() => {
                connection.isAlive = false;
                clearInterval(connection.timer);
                connection.terminate();
            }, 1000);
        }, 5000);

        connection.on('pong', () => {
            clearTimeout(connection.deathTimer);
        });

       

        connection.on("message", async (message) => {
            const messageData = JSON.parse(message.toString());
            const {sender , reciever, messageString } = messageData;
            if (sender && reciever && messageString) {
                const messageDoc = await Message.create({
                    reciever: reciever,
                    sender: sender,
                    message: messageString,
                });
                [...wss.clients].forEach((client) => {
                    if (client.userId == reciever) {
                        client.send(JSON.stringify(messageDoc));
                    }
                });

            }
        });
    });
}


module.exports = chatConnect;