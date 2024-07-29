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


const ProductContainer = () => {
  
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { addToCart, cartItems, removeFromCart, buttonClicks, buttonClicked} = useCart();

  // const [buttonClicked, setButtonClicked] = useState(products.map(()=> false));
  

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

  const handleAddToCart = (product: ProductProps, index:number) => {
    addToCart(product,index);
    buttonClicks(index, true);
    
    // const updateButtonsClick = buttonClicked
    // updateButtonsClick[index] = true
    
    // setButtonClicked(updateButtonsClick);
    
    // const cartItem = cartItems.find((item)=>
    //   item.id===product.id)

    // const quant = quantity
    // quant[index] = cartItem==undefined ? 1: cartItem.quantity

    // setQuantity(quant)

  }

  // const findQuantity = (id:number)=>{
   
  //   cartItems.find()


  // }

  return (
    <div>
      <img src={banner} alt='banner image' style={{width:"100%", height:"350px"}}/>
   <h1 style={{textAlign:"center", paddingTop:"30px"}}>Products on sale!!</h1>
    <div className="container">   
      <div className="row">
        {products.map((product, index) => (
          <div className="col-3 gy-3" key={product.id}>
            <div className="card shadow" id="card1" style={{ width: '15rem', height: '380px' }}>
              <img
                src={product.image}
                style={{ height: '120px', width: '190px', padding: '5px' }}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body" style={{ width: '200px', marginLeft: '0px' }}>
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">Price <b>${product.price}</b></p>

                <button style={{ display: buttonClicked[index] ? 'none' : 'block'}} className="btn btn-primary" id="button-card" onClick={() => handleAddToCart(product, index)}>

                  Add to cart
                </button>
                
                <div className="container text-center" style={{ display: buttonClicked[index] ? 'block' : 'none' }}>
                  <div className="row row-cols-auto">

                      <div className="col" >
                      <button type="button" onClick={() => removeFromCart(index,product)} className="btn btn-outline-danger" style={{ '--bs-btn-padding-y': '.25rem', '--bs-btn-padding-x': '.5rem', '--bs-btn-font-size': '.75rem'} as any}>-</button>
                      </div>

                      <div className="col">
                        {cartItems.find((item) => (item.id === product.id) &&(item.quantity>0) )?.quantity}

                      </div>

                      <div className="col">
                      <button type="button" onClick={()=>addToCart(product,index)} className="btn btn-outline-success" id="button-card-quant" style={{ '--bs-btn-padding-y': '.25rem', '--bs-btn-padding-x': '.5rem', '--bs-btn-font-size': '.75rem'} as any}>+</button>
                      </div>
                  </div>
                </div>

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
