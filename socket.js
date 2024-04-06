import { Server } from 'socket.io';
import axios from 'axios';
import dotenv from 'dotenv';

let interval;

const getApiAndEmit = async socket => {
   try {
     const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Fredensborg&units=metric&appid=${process.env.WEATHER_API_KEY}`);
     socket.emit('FromAPI', res.data);
   } catch (error) {
     console.error(`Error: ${error}`);
   }
};

const socketSetup = (server) => {
   const io = new Server(server);
   io.on('connection', socket => {
     //console.log("New client connected");
     if (interval) {
       clearInterval(interval);
     }
     interval = setInterval(() => getApiAndEmit(socket), 10000);
     socket.on('disconnect', () => {
     //console.log("Client disconnected");
       clearInterval(interval);
     });
   });
};

export default socketSetup;
