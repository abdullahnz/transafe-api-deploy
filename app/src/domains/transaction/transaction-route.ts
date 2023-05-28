import validateCredentials from '../../middlewares/validate-credentials-middleware';
import BaseRoutes from '../../base_claseses/base-routes';
import tryCatch from '../../utils/tryCatcher';
import TransactionController from './transaction-controller';
import { createTransactionSchema } from './transaction-schema';
import authToken from '../../middlewares/auth-token-middleware';

class TransactionRoute extends BaseRoutes {
   public routes(): void {
      this.router.post(
         '/',
         [authToken, validateCredentials(createTransactionSchema)],
         tryCatch(TransactionController.createTransaction),
      );

      this.router.get(
         '/:transaction_id',
         [authToken],
         tryCatch(TransactionController.getOneTransaction),
      );

      this.router.put(
         '/:transaction_id',
         [authToken],
         tryCatch(TransactionController.updateStatusTransaction),
      );

      this.router.get(
         '/recent/:user_id',
         [authToken],
         tryCatch(TransactionController.getRecentTransaction),
      );

      this.router.post(
         '/join/:room_id',
         [authToken],
         tryCatch(TransactionController.joinTransaction),
      );

      this.router.post(
         '/confirm_join/:room_id',
         [authToken],
         tryCatch(TransactionController.joinConfirmation),
      );

      this.router.post(
         '/:transaction_id/transaction_process',
         [authToken],
         tryCatch(TransactionController.processTransaction),
      );

      this.router.post(
         '/:transaction_id/send_order',
         [authToken],
         tryCatch(TransactionController.sendOrderTransaction),
      );

      this.router.post(
         '/:transaction_id/transaction_finish',
         [authToken],
         tryCatch(TransactionController.transactionFinish),
      );
   }
}

export default new TransactionRoute().router;
