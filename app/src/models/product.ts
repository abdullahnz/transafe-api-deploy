'use strict';
import { Model } from 'sequelize';

interface ProductAttributes {
   id: number;
   category: string;
   desc: string;
   name: string;
   price: number;
   images: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
   class Product extends Model<ProductAttributes> implements ProductAttributes {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      public id!: number;
      public category!: string;
      public desc!: string;
      public name!: string;
      public price!: number;
      public images!: string;

      static associate(models: any) {
         // define association here
         Product.hasOne(models.Transaction);
      }
   }
   Product.init(
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         price: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         category: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         desc: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         images: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'Product',
         underscored: true,
      },
   );
   return Product;
};
