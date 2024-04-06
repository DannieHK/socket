import express from 'express';
import dotenv from 'dotenv/config';
import http from 'http';
import socketSetup from './util/socket.js';
const app = express();

app.use(express.json())
    .use(express.static('../client/public'))
    .use(express.urlencoded({ extended: true }))

const server = http.createServer(app);
socketSetup(server);

const PORT = process.env.PORT;
server.listen(PORT, async (error) => {
    if (error) {
        console.log("Error: ", error)
        return;
    }
    console.log("Server is running on port: ", PORT)
});
