
import  { useState } from 'react';
import styles from './Header.module.css';
import img from '../../assets/logo.png';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

function Header() {
  const { cartItems } = useCart();
  const [showCart, setShowCart] = useState(false); 

  const toggleCart = () => {
    setShowCart(!showCart); 
  };

  return (
    <div className={styles.header_Container}>
      <Link to="/" >
      <img src={img} alt="Logo" />
      </Link>
      <span className={styles.cartIcon} onClick={toggleCart}>
      <Link to="/cart" className={styles.counter}>
        <i className="bi bi-cart4"  id='basket'/>
        <sup>{cartItems.length}</sup>
        </Link>
        </span>

    </div>
  );
}

export default Header;
