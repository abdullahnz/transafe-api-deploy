import { Request, Response } from 'express';
import TransactionService from '../transaction-service';
import db from '../../../models';
import BaseError from '../../../errors/error-mockup';
import { INVALID_PARAMS } from '../../../errors/error-codes';
import statusCodes from '../../../errors/status-codes';

class NegoController {
   public negoHandler = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      if (req.params.status === 'accept') {
         const transaction = await TransactionService.findById(
            req.params.transaction_id || '',
         );

         await db.Product.update(
            {
               price: parseInt(req.params.amount || ''),
            },
            {
               where: {
                  id: transaction.product.id,
               },
            },
         );

         return res.status(200).json({
            code: 'NEGO_ACCEPTED',
            status: 'OK',
            data: {
               message: 'Nego accepted by seller',
            },
         });
      } else if (req.params.status === 'decline') {
         return res.status(200).json({
            code: 'NEGO_DECLINED',
            status: 'OK',
            data: {
               message: 'Nego declined by seller',
            },
         });
      } else {
         throw new BaseError(
            INVALID_PARAMS,
            statusCodes.INVALID_PARAMS.message,
            'invalid Status Params value',
         );
      }
   };
}

export default new NegoController();
