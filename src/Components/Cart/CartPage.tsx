import { useCart } from '../contexts/CartContext';
import ErrorPage from '../Error/errorPage';
import './CartPage.css';


const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, error } = useCart();
  const calculation = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className='Cart_page'>
      {error && <ErrorPage message={error} onRetry={() => window.location.reload()} />}
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
            cartItems.map((item, index) => {
              const formattedPrice = item.price.toFixed(2);
              const formattedTotal = (item.price * item.quantity).toFixed(2);

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      className='imageContain'
                      alt={item.title}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>${formattedPrice}</td>
                  <td>
                    <button
                      className='btn btn-sm btn-primary me-2'
                      onClick={() => addToCart(item, item.id - 1)}
                    >
                      +
                    </button>
                    <button
                      className='btn btn-sm btn-danger'
                      onClick={() => removeFromCart(item.id - 1, item)}
                    >
                      -
                    </button>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${formattedTotal}</td>
                </tr>
              );
            })
          ) : (
            <tr className='table-warning'>
              <td colSpan={7}>No items in the cart</td>
            </tr>
          )}
          <tr className='table-warning'>
            <th colSpan={6} className="text-right">Total cost:</th>
            <th>${calculation().toFixed(2)}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
