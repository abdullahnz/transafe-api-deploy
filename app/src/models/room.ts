('use strict');
import { Model } from 'sequelize';

interface RoomAttributes {
   id: string;
   seller_id: number;
   buyer_id: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
   class Room extends Model<RoomAttributes> implements RoomAttributes {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      public id!: string;
      public seller_id!: number;
      public buyer_id!: number;
      static associate(models: any) {
         // define association here
         // Room.belongsTo(models.Transaction, {
         //    foreignKey: 'transaction_id',
         // });
         Room.hasOne(models.Transaction);
      }
   }
   Room.init(
      {
         id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
         },
         seller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         buyer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
         },
      },
      {
         sequelize,
         modelName: 'Room',
         underscored: true,
      },
   );
   return Room;
};
