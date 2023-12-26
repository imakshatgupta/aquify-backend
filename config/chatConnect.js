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

        const cookies = req.headers.cookie;
        if (cookies) {
            cookies.split("; ").find((cookie) => {
                if (cookie.startsWith("token=")) {
                    const token = cookie.split("=")[1];
                    if (token) {
                        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                            if (err) throw err;
                            connection.userId = decoded.id;
                        });
                    }
                }
            });
        }

        connection.on("message", async (message) => {
            const messageData = JSON.parse(message.toString());
            const { reciever, messageString } = messageData;
            if (reciever && messageString) {
                const messageDoc = await Message.create({
                    reciever: reciever,
                    sender: connection.userId,
                    message: messageString,
                });
                console.log('Running');
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