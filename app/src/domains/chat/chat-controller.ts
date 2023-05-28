import { Request, Response } from 'express';
import ChatService from './chat-service';

class ChatController {
   public runChatServer = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      ChatService.runServer();
      return res.status(200).json({
         code: 'SUCCESS_RUN_CHAT_SERVICE',
         status: 'OK',
         data: {
            message: 'Socket Server Is Running',
         },
      });
   };
}

export default new ChatController();
