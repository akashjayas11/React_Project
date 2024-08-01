import { useCart } from '../contexts/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();

  const calculation = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className='Cart_page'>
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
          {cartItems.map((item, index) => {
            const formattedPrice = item.price.toFixed(2);
            const formattedTotal = (item.price * item.quantity).toFixed(2);

            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    style={{ width: '100px', height: '100px' }}
                    className='imageContain'
                    alt={item.title}
                  />
                </td>
                <td>{item.title}</td>
                <td>${formattedPrice}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary me-2' onClick={() => addToCart(item)}>+</button>
                    
                  <button
                    className='btn btn-sm btn-danger' style={{paddingLeft:"10px", paddingRight:"10px"}} onClick={() => removeFromCart(item)}>-</button>
                </td>
                <td>{item.quantity}</td>
                <td>${formattedTotal}</td>
              </tr>
            );
          })}
          <tr className='table-warning'>
            <th colSpan = "6"  className="text-right">Total cost:</th>
            <th>${calculation().toFixed(2)}</th>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default CartPage;