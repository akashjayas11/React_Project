import React from 'react';
import { useCart } from '../contexts/CartContext';
import './CartPage.css'

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className='Cart_page'>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>

            <img src={item.image} className='imageContain' />-{item.title} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
