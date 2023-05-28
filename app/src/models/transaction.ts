'use strict';
import { Model } from 'sequelize';

interface TransactionAttributes {
   id: string;
   product_id: number;
   room_id: number;
   tax: number;
   shipping_fee?: number;
   negotiable?: boolean;
   status?: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
   class Transaction
      extends Model<TransactionAttributes>
      implements TransactionAttributes
   {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      public id!: string;
      public product_id!: number;
      public room_id!: number;
      public tax!: number;
      public shipping_fee?: number;
      public negotiable?: boolean;
      public status?: string;
      static associate(models: any) {
         // define association here
         Transaction.belongsTo(models.Room, {
            as: 'room',
            foreignKey: 'room_id',
         });
         Transaction.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
         });
         Transaction.hasMany(models.Evidence, {
            as: 'evidence',
         });
      }
   }
   Transaction.init(
      {
         id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
         },
         product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Product',
               key: 'id',
            },
         },
         room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Room',
               key: 'id',
            },
         },
         tax: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         shipping_fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
         },
         negotiable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
         },
         status: {
            type: DataTypes.ENUM(
               'NOTJOIN',
               'JOIN',
               'DIBAYAR',
               'DIPROSES',
               'DIKIRIM',
               'SELESAI',
               'DIBATALKAN',
            ),
            defaultValue: 'NOTJOIN',
         },
      },
      {
         sequelize,
         modelName: 'Transaction',
         underscored: true,
      },
   );
   return Transaction;
};
