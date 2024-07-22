import React, { useState, useEffect, createContext, useContext } from 'react'
import { MyContext } from '../../Contexts/ItemsContext';
import './productContainer.css'

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductContainer: React.FC = () => {
  // const [products, setProducts] = useState<Product[]>([]);


  // useEffect(() => {

  //   const fetchProducts = async () => {

  //     try {
  //       const response = await fetch('https://fakestoreapi.com/products');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       const data = await response.json();
  //       // console.log(data)
  //       setProducts(data);

  //     }

  //     catch (error) {
  //       console.error('Error fetching products', error);
  //     }
  //   }


  //   fetchProducts();

  // }, []);
const products = useContext(MyContext)
  return (

    <div className="container">
      <div className=" row">

        {products.map((product) => (

          <div className="col-3  gy-3 " key={product.id}>
            <div className="card shadow" id='card1' style={{ width: '15rem', height: '380px' }}>

              <img src={product.image} style={{ height: '120px', width: '190px', padding: '5px' }} className="card-img-top" alt={product.title} />

              <div className="card-body" style={{ width: '200px', marginLeft: '0px' }}>
                <h6 className="card-title"> {product.title}</h6>
                <p className="card-text">Price <b>${product.price}</b></p>
                <a href="#" className="btn btn-primary" id='button-card'>Add to cart</a>
              </div>

            </div>
          </div>

        ))}


      </div>
    </div>
  );
};

export default ProductContainer;