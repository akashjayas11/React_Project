import { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from '../../contexts/CartContext'; 
const PaymentSummary = () => {
  const { cartItems } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item: CartItem) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  return (
    <>
      <h1>PaymentSummary</h1>
      <ul>
        {cartItems.map((item: CartItem) => (
          <li key={item.id}>
            {item.title} - <b>${item.price}</b><br />
            Quantity: <b>{item.quantity}</b>
          </li>
        ))}
        <li><b>Total Pay:</b> ${totalAmount}</li>
      </ul>
    </>
  );
};

export default PaymentSummary;
