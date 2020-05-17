import products from '../../static/products.json';
import connectDatabase from '../../utils/connectDb';

connectDatabase();

export default (req, res) => {
  res.status(200).json(products);
}