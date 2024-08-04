import "./CartPage.css";
import React from 'react';

interface CartItemProps {
  item: {
    id: number;
    image: string;
    title: string;
    price: number;
    quantity: number;
  };
  index: number;
  addToCart: (item: any, index: number) => void;
  removeFromCart: (index: number, item: any) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, index, addToCart, removeFromCart }) => {
  const formattedPrice = item.price.toFixed(2);
  const formattedTotal = (item.price * item.quantity).toFixed(2);

  return (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>
        <img
          src={item.image}
          className="imageContain"
          alt={item.title}
        />
      </td>
      <td>{item.title}</td>
      <td>${formattedPrice}</td>
      <td>
        <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => addToCart(item, item.id - 1)}
        >
          +
        </button>
        
        <button
          className="btn btn-sm btn-danger"
          
          onClick={() => removeFromCart(item.id - 1, item)}
        >
          -
        </button>
      </td>
      <td>{item.quantity}</td>
      <td>${formattedTotal}</td>
    </tr>
  );
};

export default CartItem;
