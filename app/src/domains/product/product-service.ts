import db from '../../models';

class ProductService {
   public findById = async (product_id: number): Promise<any> => {
      const product = await db.Product.findOne({
         where: {
            id: product_id,
         },
      });

      return product;
   };
}

export default new ProductService();
