('use strict');
import { Model } from 'sequelize';

interface UserAttributes {
   id: number;
   name: string;
   username: string;
   phone_number: number;
   email: string;
   password: string;
   address?: string;
   balance?: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
   class User extends Model<UserAttributes> implements UserAttributes {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      id!: number;
      name!: string;
      username!: string;
      phone_number!: number;
      email!: string;
      password!: string;
      address?: string;
      balance?: number;
      static associate(models: any) {
         // define association here
      }
   }
   User.init(
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         username: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         address: {
            type: DataTypes.STRING,
         },
         balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
         },
      },
      {
         sequelize,
         modelName: 'User',
         underscored: true,
      },
   );
   return User;
};
