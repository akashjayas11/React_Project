// ProductCard.tsx
import React from 'react';
import './ProductCard.css'
import { ProductProps } from '../../Pages/HomePage/HomePage';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import QuantityButtons from '../QuantityButtons/QuantityButtons';

type ProductCardProps = {
  product: ProductProps;
  index: number;
  handleAddToCart: (product: ProductProps, index: number) => void;
  buttonClickList: boolean[];
}

const ProductCard = ({ product, index, handleAddToCart, buttonClickList }:ProductCardProps) => {

  return (
    <div className="col-3 gy-3" key={product.id}>

      <div className="card shadow card-custom">

        <img
          src={product.image}
          className="card-img-top card-img-custom"
          alt={product.title}
        />

        <div className="card-body card-body-custom">

          <h6 className="card-title">{product.title}</h6>
          <p className="card-text">Price <b>${product.price}</b></p>

          <AddToCartButton index={index} buttonClickList={buttonClickList} handleAddToCart={handleAddToCart} product={product} />
          <QuantityButtons index={index} product={product} />
          
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
