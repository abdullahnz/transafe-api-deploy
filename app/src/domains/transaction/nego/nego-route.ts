import BaseRoutes from '../../../base_claseses/base-routes';
import authToken from '../../../middlewares/auth-token-middleware';
import tryCatch from '../../../utils/tryCatcher';
import NegoController from './nego-controller';

class NegoRoutes extends BaseRoutes {
   public routes(): void {
      this.router.post(
         '/:transaction_id/nego/:amount/:status',
         [authToken],
         tryCatch(NegoController.negoHandler),
      );
   }
}

export default new NegoRoutes().router;
