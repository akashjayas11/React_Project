import React from "react";
import { useCart } from "../../contexts/CartContext";
import ErrorPage from "../Error/errorPage";
import CartItem from "../../Components/Cart/CartItem";
import CartTotal from "../../Components/Cart/TotalPayment";
import "../../Components/Cart/CartPage.css";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, addToCart, error } = useCart();

  const calculation = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="Cart_page">
      {error && (
        <ErrorPage message={error} onRetry={() => window.location.reload()} />
      )}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Rate</th>
            <th scope="col">Update</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))
          ) : (
            <tr className="table-warning">
              <td colSpan={7}>No items in the cart</td>
            </tr>
          )}
          <CartTotal total={calculation()} />
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
