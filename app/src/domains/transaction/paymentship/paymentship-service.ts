import midtransClient from 'midtrans-client';
import 'dotenv/config';
import BaseError from '../../../errors/error-mockup';
import { MIDTRANS_ERROR } from '../../../errors/error-codes';
import statusCodes from '../../../errors/status-codes';

class PaymentshipService {
   public createSnap = async (payloads: any): Promise<any> => {
      // Create Snap API instance
      let snap = new midtransClient.Snap({
         // Set to true if you want Production Environment (accept real transaction).
         isProduction: process.env.NODE_ENV == 'development' ? false : true,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY,
      });

      let parameter = {
         transaction_details: {
            order_id: payloads.order_id,
            gross_amount: payloads.gross_amount,
         },
         credit_card: {
            secure: true,
         },
         user_details: {
            username: payloads.username,
            email: payloads.email,
            phone: payloads.phone,
         },
      };

      const transaction = await snap.createTransaction(parameter);

      if (transaction) {
      }

      return transaction;
      try {
      } catch (err: any) {
         throw new BaseError(
            MIDTRANS_ERROR,
            statusCodes.BAD_REQUEST.message,
            err.message.toString(),
         );
      }
   };

   public coreAPI = (): any => {
      let core = new midtransClient.CoreApi({
         isProduction: process.env.NODE_ENV == 'development' ? false : true,
         serverKey: process.env.SERVER_KEY,
         clientKey: process.env.CLIENT_KEY,
      });

      return core;
   };

   public eMoney = async (payloads: any): Promise<any> => {
      const core = this.coreAPI();

      const parameter = {
         payment_type: payloads.payment_type,
         transaction_details: {
            order_id: payloads.transaction_id,
            gross_amount: payloads.amount,
         },
         user_details: {
            username: payloads.username,
            email: payloads.email,
            phone: payloads.phone_number,
         },
      };

      const transaction = await core.charge(parameter);
      console.info(transaction);

      return transaction;
   };
}

export default new PaymentshipService();
