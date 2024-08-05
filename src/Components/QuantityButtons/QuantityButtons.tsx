// QuantityButtons.tsx
import React from 'react';
import { Product, useCart } from '../../contexts/CartContext';
import './QuantityButtons.css'

type QuantityButtonsProps = { 
  index: number;
  product: Product;
}

const QuantityButtons = ({ index, product }: QuantityButtonsProps) => {

  const { addToCart, removeFromCart, cartItems, buttonClickList} = useCart();

  return (
    
    <div className={`container text-center container-cust ${buttonClickList[index] ? '' : 'hidden'}`}>
        <div className="row row-cols-auto">
        <div className="col">
            <button
            type="button"
            onClick={() => removeFromCart(index, product)}
            className="btn btn-outline-danger btn-custom"
            >
            -
            </button>
        </div>
        <div className="col">
            {cartItems.find(item => item.id === product.id && item.quantity > 0)?.quantity}
        </div>
        <div className="col">
            <button
            type="button"
            onClick={() => addToCart(product, index)}
            className="btn btn-outline-success btn-custom"
            >
            +
            </button>
        </div>
        </div>
    </div>
  );
};

export default QuantityButtons;
