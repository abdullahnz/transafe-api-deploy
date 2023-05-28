import { Request, Response, NextFunction } from 'express';
import statusCodes from '../errors/status-codes';
import { ACCESS_DENIED } from '../errors/error-codes';
import BaseError from '../errors/error-mockup';
import jwt from 'jsonwebtoken';

const authToken = (req: Request, res: Response, next: NextFunction): any => {
   const authHeader: string | undefined = req.get('X-Auth');

   const token: string | undefined = authHeader && authHeader.split(' ')[1];

   if (token == null)
      throw new BaseError(
         ACCESS_DENIED,
         statusCodes.UNAUTHORIZE.message,
         'User Have Not Login',
      );

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY || '', (err, user) => {
      if (err) {
         if (err.message == 'invalid signature') {
            throw new BaseError(
               ACCESS_DENIED,
               statusCodes.FORBIDDEN.message,
               'Invalid Signature',
            );
         } else {
            throw new BaseError(
               ACCESS_DENIED,
               statusCodes.FORBIDDEN.message,
               'Token Is Invalid Or No Longer Valid',
            );
         }
      }

      req.app.locals.user = user;

      return next();
   });
};

export default authToken;
