('use strict');
import { Model } from 'sequelize';

interface EvidenceAttributes {
   transaction_id: number;
   shipping_name: string;
   resi: string;
   desc: string;
   evidence_pict: string;
   isReturn?: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
   class Evidence
      extends Model<EvidenceAttributes>
      implements EvidenceAttributes
   {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      public transaction_id!: number;
      public shipping_name!: string;
      public resi!: string;
      public desc!: string;
      public evidence_pict!: string;
      public isReturn?: boolean;
      static associate(models: any) {
         // define association here
         Evidence.hasOne(models.Transaction);
      }
   }
   Evidence.init(
      {
         transaction_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
               model: 'Transaction',
               key: 'id',
            },
         },
         shipping_name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         resi: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         desc: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         evidence_pict: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'Evidence',
         underscored: true,
      },
   );
   return Evidence;
};
