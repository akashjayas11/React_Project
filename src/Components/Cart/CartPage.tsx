import { useCart } from '../contexts/CartContext';
import './CartPage.css'
import PaymentSummary from './PaymentSummary/PaymentSummary';

const CartPage= () => {
  const { cartItems, removeFromCart,addToCart } = useCart();
  return (
    <div className='Cart_page'>
      

<table className="table table-hover" style={{width: '60%'}}>
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
    {cartItems.map((item,index) => (
      <tr key={item.id}>
      {/* <th scope="row">1</th> */}
      <td>{index + 1}</td>
      <td><img src={item.image} style={{width:'100px',height:'100px'}} className='imageContain' /></td>
      <td>{item.title}</td>
      <td>${item.price}</td>
      <td><button className='btn btn-sm btn-primary' onClick={() => addToCart(item.id)}>+</button>
      <button className='btn btn-sm btn-danger' onClick={() => removeFromCart(item.id)}>-</button>
      </td>
      <td>{item.quantity}</td>
      <td>${item.price * item.quantity}</td>
    </tr>
    ))}
  </tbody>
</table>

      <PaymentSummary />

    </div>
  );
};

export default CartPage;