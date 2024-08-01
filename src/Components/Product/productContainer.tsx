import './productContainer.css';
import React, { useState, useEffect } from 'react';
import banner from '../../assets/banner.jpg.jpg';
import { useCart } from '../contexts/CartContext';
import ErrorPage from '../Error/errorPage';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}


const ProductContainer = () => {
  
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { addToCart, cartItems, removeFromCart, buttonClicks, buttonClicked} = useCart();
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          setError('There was a problem fetching the products. Please try again later.');
          console.log('Failed to fetch data');
          return;
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('There was a problem fetching the products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);
  const handleImageError = () => {
    setImageError(true);
   
  };

  const handleAddToCart = (product: ProductProps, index:number) => {
    addToCart(product,index);
    buttonClicks(index, true);
  }
if(error){
  return(
  <ErrorPage message={error} 
  onRetry={() => window.location.reload()} />
  )
}
  return (
   <>
      {imageError?(< ErrorPage message='Failed to load Image try again'/>):(
        <div>
      <img src={banner} onError={handleImageError} alt='banner' className='banner-img'/>
      <h1 className='heading'>Products on sale!!</h1>
    <div className="container">   
      <div className="row">
        {products.length> 0 ?products.map((product, index) => (
          <div className="col-3 gy-3" key={product.id}>
            <div className="card shadow card-custom">
              <img src={product.image} className="card-img-top card-img-custom" alt={product.title} />
              <div className="card-body card-body-custom">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">Price <b>${product.price}</b></p>

                <button className={`btn btn-primary button-card ${buttonClicked[index]? 'hidden':''}`} onClick={() => handleAddToCart(product, index)}>

                  Add to cart
                </button>
                
                <div className={`container text-center container-cust ${buttonClicked[index]?'':'hidden'}`}>
                  <div className="row row-cols-auto">

                      <div className="col" >
                      <button type="button" onClick={() => removeFromCart(index,product)} className="btn btn-outline-danger btn-custom" >-</button>
                      </div>

                      <div className="col">
                        {cartItems.find((item) => (item.id === product.id) &&(item.quantity>0) )?.quantity}

                      </div>

                      <div className="col">
                      <button type="button" onClick={() => addToCart(product, index)} className="btn btn-outline-success btn-custom" > + </button>
                      </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )):(<ErrorPage message="No Products Available check it"/>)}
      </div>
    </div>
    </div>)}
    </>
  );
};

export default ProductContainer;
