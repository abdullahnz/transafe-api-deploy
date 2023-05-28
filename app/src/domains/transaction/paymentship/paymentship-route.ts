import BaseRoutes from '../../../base_claseses/base-routes';
import authToken from '../../../middlewares/auth-token-middleware';
import tryCatch from '../../../utils/tryCatcher';
import paymentshipController from './paymentship-controller';

class PaymentshipRoutes extends BaseRoutes {
   public routes(): void {
      this.router.post(
         '/:transaction_id/paymentship',
         [authToken],
         tryCatch(paymentshipController.createSnapTransaction),
      );

      this.router.post(
         '/paymentship/webhookHandling',
         tryCatch(paymentshipController.webhooksPaymentship),
      );

      this.router.post(
         '/paymentship/webhookHandling',
         tryCatch(paymentshipController.eMoneyPaymentship),
      );
   }
}

export default new PaymentshipRoutes().router;
