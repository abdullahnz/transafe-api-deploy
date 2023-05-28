import BaseRoutes from '../../base_claseses/base-routes';
import tryCatch from '../../utils/tryCatcher';
import chatController from './chat-controller';

class ChatRoutes extends BaseRoutes {
   public routes(): void {
      this.router.get('/', tryCatch(chatController.runChatServer));
   }
}

export default new ChatRoutes().router;
