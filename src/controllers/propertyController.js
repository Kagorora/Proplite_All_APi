import search from '../helpers/search';
import con from '../dbConnect';
import propertyModal from '../models/property';

class propertyController {
  // ======================================== Properties ====================================
  static async createProduct(req, res) {
    
    const {
        owner,status,price,state,city,address,type,
      } = req.body;
      const addProperty = await con.query(propertyModal.createProperty,
      [ owner,status,price,state,city,address,type]);
      if (addProperty.rowCount !== 0) {
        return res.status(201).json({
          status: 201,
          data: {
            owner,
            status,
            price,
            state,
            city,
            address,
            type,
          },
        });
      } 
      return res.status(400).json({ status: 400, error: 'user not added' });
  } 

  static async findById(req, res) {
    const getProduct = await search.searchProperty(req.params.id);
    
    if (getProduct.rowCount == 0) {
      return res.status(404).json({ status: 404, message: 'Product not Found' });
    }
    
    if (getProduct.rowCount !== 0) {
      return res.status(200).json({
        status: 200,
        data: {
          id: getProduct.rows[0].id,
          owner: getProduct.rows[0].owner,
          status: getProduct.rows[0].status,
          price: getOwner.rows[0].price,
          state: getProduct.rows[0].state,
          city: getProduct.rows[0].city,
          address: getProduct.rows[0].address,
          type: getProduct.rows[0].type,
        },
      });
    }
  }
}
export default propertyController;
