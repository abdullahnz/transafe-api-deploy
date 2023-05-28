import {
   FIALED_DATABASE_PROCESS,
   INVALID_DATABASE_PROCESS,
   INVALID_IDENTITY,
} from '../../errors/error-codes';
import BaseError from '../../errors/error-mockup';
import db from '../../models';
import statusCodes from '../../errors/status-codes';

class TransactionService {
   public createTransaction = async (data: any): Promise<any> => {
      try {
         const result = await db.sequelize.transaction(
            async (transactionData: any): Promise<any> => {
               const product = await db.Product.create(
                  {
                     name: data.name,
                     price: data.price,
                     category: data.category,
                     desc: data.desc,
                     images: data.images,
                  },
                  {
                     transaction: transactionData,
                  },
               );

               const room = await db.Room.create(
                  {
                     seller_id: data.seller_id,
                  },
                  {
                     transaction: transactionData,
                  },
               );

               const transaction = await db.Transaction.create(
                  {
                     product_id: product.id,
                     room_id: room.id,
                     tax: data.tax,
                     negotiable: data.negotiable,
                     shipping_fee: data.shipping_fee,
                  },
                  {
                     transaction: transactionData,
                  },
               );

               return transaction.id;
            },
         );

         const results = await db.Transaction.findOne({
            where: {
               id: result,
            },
            include: [
               { model: db.Product, as: 'product' },
               { model: db.Room, as: 'room' },
            ],
            attributes: { exclude: ['ProductId'] },
         });

         return results;
      } catch (error: any) {
         throw new BaseError(
            INVALID_DATABASE_PROCESS,
            statusCodes.BAD_REQUEST.message,
            error.message.toString(),
         );
      }
   };

   public findById = async (transaction_id: string): Promise<any> => {
      console.info(`TF ID : ${transaction_id}`);
      return await db.Transaction.findOne({
         where: {
            id: transaction_id,
         },
         include: [
            { model: db.Product, as: 'product' },
            { model: db.Room, as: 'room' },
         ],
         attributes: { exclude: ['ProductId', 'RoomId'] },
      });
   };

   public updateStatus = async (
      transaction_id: string,
      status: string,
   ): Promise<boolean> => {
      db.Transaction.update(
         {
            status: status,
         },
         {
            where: {
               id: transaction_id,
            },
         },
      ).catch((err: any) => {
         throw new BaseError(
            FIALED_DATABASE_PROCESS,
            statusCodes.BAD_REQUEST.message,
            err.message.toString(),
         );
      });

      return true;
   };

   public getRecent = async (user_id: number): Promise<any> => {
      const results = await db.Transaction.findAll({
         include: [
            { model: db.Product, as: 'product' },
            {
               model: db.Room,
               as: 'room',
               where: {
                  [db.Sequelize.Op.or]: [
                     { buyer_id: user_id },
                     { seller_id: user_id },
                  ],
               },
            },
         ],
         attributes: { exclude: ['ProductId', 'RoomId'] },
      });

      console.info(`CURRENT USER LOGIN : ${user_id}`);

      return results;
   };

   public join = async (room_id: string, user_id: number): Promise<any> => {
      const room = await db.Room.findOne({
         where: {
            id: room_id,
         },
      });

      if (room.seller_id == user_id) {
         throw new BaseError(
            INVALID_IDENTITY,
            statusCodes.BAD_REQUEST.message,
            "Buyer can't equal to seller!",
         );
      }

      const transaction = await this.findById(room.transaction_id);

      return transaction;
   };

   public confirmJoin = async (user_id: number, room_id: string) => {
      const room = await db.Room.findOne({
         where: {
            id: room_id,
         },
      });

      if (room.seller_id == user_id) {
         throw new BaseError(
            INVALID_IDENTITY,
            statusCodes.BAD_REQUEST.message,
            "Buyer can't equal to seller!",
         );
      }

      db.Room.update(
         {
            buyer_id: user_id,
         },
         {
            where: {
               id: room_id,
            },
         },
      ).catch((err: any) => {
         throw new BaseError(
            FIALED_DATABASE_PROCESS,
            statusCodes.BAD_REQUEST.message,
            err.message.toString(),
         );
      });

      await this.updateStatus(room.transaction_id, 'JOIN');
   };

   public nego = async (
      transaction_id: number,
      amount: number,
   ): Promise<any> => {
      // cari transaksi by id
      // if acc -> update transaction.product.price = amount
      // else nothing to do
   };

   public paymentship = async (data: any) => {
      try {
         const result = await db.sequelize.transaction(
            async (transactionData: any) => {
               const paymentship = await db.Paymentship.create(data, {
                  transaction: transactionData,
               });

               return paymentship;
            },
         );

         return result;
      } catch (error: any) {
         throw new BaseError(
            INVALID_DATABASE_PROCESS,
            statusCodes.BAD_REQUEST.message,
            error.message.toString(),
         );
      }
   };

   public sendOrder = async (data: any): Promise<any> => {
      await db.Evidence.create({
         ...data,
         transaction_id: data.transaction_id,
      });

      const transaction = await db.Transaction.findOne({
         where: {
            id: data.transaction_id,
         },
         include: [
            { model: db.Product, as: 'product' },
            { model: db.Room, as: 'room' },
            { model: db.Evidence, as: 'evidence' },
         ],
         attributes: { exclude: ['ProductId', 'RoomId'] },
      });

      // update status = dikirim

      return transaction;
   };
}

export default new TransactionService();

// where not tidak sesuai
// where: {
//    status: {
//       [db.Sequelize.Op.not]: 'DIBATALKAN',
//    },
// },
