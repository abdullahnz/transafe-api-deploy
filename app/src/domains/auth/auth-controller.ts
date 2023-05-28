import { Request, Response } from 'express';
import db from '../../models';
import AuthUtils from '../../utils/auth-utils';
import BaseError from '../../errors/error-mockup';
import statusCodes from '../../errors/status-codes';
import { DUPLICATE_FOUND, INVALID_CREDENTIALS } from '../../errors/error-codes';

class AuthController {
   public register = async (req: Request, res: Response): Promise<Response> => {
      const user = await db.User.findOne({
         where: {
            username: req.body.username,
         },
      });

      if (user) {
         throw new BaseError(
            DUPLICATE_FOUND,
            statusCodes.DUPLICATE.message,
            'Username Already Exists',
         );
      }

      const hashPassword: string = await AuthUtils.hash(req.body.password);

      await db.User.create({
         name: req.body.name,
         username: req.body.username,
         phone_number: req.body.phone_number,
         email: req.body.email,
         password: hashPassword,
      });

      return res.status(200).json({
         code: 'SUCCESS_REGISTER',
         status: 'OK',
         data: {
            message: 'Register Success!',
         },
      });
   };

   public login = async (req: Request, res: Response): Promise<Response> => {
      const user = await db.User.findOne({
         where: {
            username: req.body.username,
         },
      });

      const match: boolean =
         user &&
         (await AuthUtils.passwordCompare(req.body.password, user.password));

      if (!user || !match) {
         throw new BaseError(
            INVALID_CREDENTIALS,
            statusCodes.BAD_REQUEST.message,
            'Incorect username or password',
         );
      }

      let accessToken: string = AuthUtils.generateToken(user.id, user.username);

      return res.status(200).json({
         code: 'SUCCESS_LOGIN',
         status: 'OK',
         data: {
            user_id: user.id,
            accessToken: accessToken,
            refreshToken: 'THIS_REFRESH_TOKEN',
         },
      });
   };
}

export default new AuthController();
