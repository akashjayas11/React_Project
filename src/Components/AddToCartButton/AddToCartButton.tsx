import React from 'react';
import { ProductProps } from '../../Pages/HomePage/HomePage';
import { Product } from '../../contexts/CartContext';
import './AddToCartButton.css'

type AddToCart = {
    index:number;
    buttonClickList: boolean[];
    handleAddToCart:(product:ProductProps, index:number)=>void;
    product: Product;
}

const AddToCartButton = ({ index, buttonClickList, handleAddToCart, product }: AddToCart) => {
  return (
    <button
      className={`btn btn-primary button-card ${buttonClickList[index] ? 'hidden' : ''}`}
      onClick={() => handleAddToCart(product, index)}
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
