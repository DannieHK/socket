import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

const users = {}; // Temporary user for chatting.
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name);
    });
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]});
});
