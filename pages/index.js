import React from 'react';
import ProductList from '../components/Index/ProductList';
import axios from 'axios';

function Home({products}) {
  return <ProductList products={products}/>
}

Home.getInitialProps = async () => {
  const url = 'http://localhost:3000/api/products';
  const res = await axios.get(url);
  return {products: res.data}
}

export default Home;
