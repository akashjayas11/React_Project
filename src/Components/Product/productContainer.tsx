import './productContainer.css';
import React, { useState, useEffect } from 'react';
import banner from '../../assets/banner.jpg.jpg';
import { useCart } from '../contexts/CartContext';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}


const ProductContainer: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { addToCart } = useCart(); // Import addToCart function from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ProductProps) => {
    addToCart(product); // Call addToCart function from CartContext with the product
  };
// col-sm-6 col-md-4 col-lg-3 mb-4
  return (
    <div>
      <img src={banner} alt='banner image' style={{width:"100%", height:"350px"}}/>
   <h1 style={{textAlign:"center", paddingTop:"30px"}}>Products on sale!!</h1>
    <div className="container">   
      <div className="row">
        {products.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={product.id}>
            <div className="card shadow mr-3" id="card1" style={{ width: '15rem', height: '380px' }}>
              <img
                src={product.image}
                style={{ height: '120px', width: '190px', padding: '5px' }}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body" style={{ width: '200px', marginLeft: '0px' }}>
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">Price <b>${product.price}</b></p>
                <button className="btn btn-dark" id="button-card" onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductContainer;
