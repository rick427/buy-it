import React, {useState} from 'react';
import {Segment} from 'semantic-ui-react';
import {parseCookies} from 'nookies';
import axios from 'axios';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';

function Cart({user, products}) {
  const [cartProducts, setCartProducts] = useState(products);

  async function handleRemoveFromCart (productId){
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get('token');
    const payload = {
      params: {productId},
      headers: {Authorization: token}
    }
    const res = await axios.delete(url, payload);
    setCartProducts(res.data);
  }

  return (
    <Segment>
      <CartItemList 
        handleRemoveFromCart={handleRemoveFromCart} 
        products={cartProducts} 
        user={user}
      />
      <CartSummary products={cartProducts}/>
    </Segment>
  )
}

Cart.getInitialProps = async ctx => {
  const {token} = parseCookies(ctx);

  if(!token){
    return { products: []};
  }

  const url = `${baseUrl}/api/cart`;
  const payload = { headers: {Authorization: token}}
  const res = await axios.get(url, payload);
  return {products: res.data};
}

export default Cart;
