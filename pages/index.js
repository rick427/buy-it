import React, {useEffect} from 'react';
import axios from 'axios';

function Home() {

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts(){
    try {
      const url = 'http://localhost:3000/api/products';
      const res = await axios.get(url);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return <>home</>;
}

export default Home;
