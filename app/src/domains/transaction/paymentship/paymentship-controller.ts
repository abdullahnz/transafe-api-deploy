import { Request, Response } from 'express';
import PaymentshipService from './paymentship-service';
import TransactionService from '../transaction-service';
import UserService from '../../user/user-service';

class PaymentshipController {
   public paymentshipHandling = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      let transaction: any;
      if (req.body.payment_type === 'gopay') {
         transaction = await PaymentshipService.eMoney(req.body);
      }
      return res.status(200).json({
         code: 'CREATED_EMONEY_TRANSACTION',
         status: 'OK',
         data: {
            transaction,
         },
      });
   };
   public eMoneyPaymentship = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const transaction = await PaymentshipService.eMoney(req.body);
      return res.status(200).json({
         code: 'CREATED_EMONEY_TRANSACTION',
         status: 'OK',
         data: {
            transaction,
         },
      });
   };

   public createSnapTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const transaction = await TransactionService.findById(
         req.params.transaction_id || '-1',
      );

      // console.info(transaction);
      // return res.send(transaction);

      const user = await UserService.findById(req.app.locals.user.userId);

      const payloads = {
         order_id: transaction.id,
         gross_amount:
            parseInt(transaction.product.price) +
            parseInt(transaction.tax) +
            transaction.shipping_fee,
         username: user.username,
         email: user.email,
         phone: user.phone_number,
      };

      const snap = await PaymentshipService.createSnap(payloads);

      await TransactionService.updateStatus(
         req.params.transaction_id || '-1',
         'DIBAYAR',
      );

      return res.status(200).json({
         code: 'PAYMENTSHIP_SUCCESS',
         status: 'OK',
         data: {
            ...snap,
         },
      });
   };

   public webhooksPaymentship = (req: Request, res: Response): Response => {
      console.info(req.body);

      return res.status(200).json({
         code: 'RECIVE_FROM_MIDTRANS_WEBHOOK_API',
         status: 'OK',
         data: {
            ...req.body,
         },
      });
   };
}

export default new PaymentshipController();
