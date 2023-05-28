import express from 'express';
import WebSocket from 'ws';
import ExpressApplication from '../../app';
import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';

class ChatService {
   public app: any = express();
   public httpServer = createServer(this.app);   

   public runServer = () => {
      const io: any = new Server(this.httpServer, {});

      io.on('connection', (socket: any) => {
         socket.join('anonymous_group');
         console.info(socket.id);
         socket.on('sendMsg', (msg: any) => {
            console.info('msg', msg);
            io.to('anonymous_group').emit('sendMsgServer', msg);
         });
         socket.on('negotiate', (amount: any) => {
            console.info('nego', amount);
            io.to('anonymous_group').emit('nego', amount);
         });
      });
   };

   public runSocketServer = () => {
      const server = new WebSocket.Server({ port: 1233 });

      server.on('connection', (ws) => {
         console.info('New Client Connected');

         ws.on('message', (message) => {
            console.info(message);
            ws.send(`Your message : ${message}`);
         });
      });
   };
}

export default new ChatService();
