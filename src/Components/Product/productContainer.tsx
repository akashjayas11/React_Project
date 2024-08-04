import './productContainer.css';
import React, { useState, useEffect } from 'react';
import banner from '../../assets/banner.jpg.jpg';
import { useCart } from '../../contexts/CartContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import ErrorPage from '../../Pages/Error/errorPage';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductContainer = () => {

  //state variable for storing ProductList
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { addToCart, cartItems, removeFromCart, buttonClickList, handleButtonClicks } = useCart();

  //state variable to check Products are fetched or not and display error page
  const [error, setError] = useState<string | null>(null);

  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products?limit=20&page=${page}`);
        if (!response.ok) {
          setError('There was a problem fetching the products. Please try again later.');
          console.log('Failed to fetch data');
          return;
        }
        const data = await response.json();

        // To check if there are no products to load
        if (data.length === 0) {
          setHasMore(false);
        }

        else {
          setProducts(prevProducts => [...prevProducts, ...data]);
        }
      } 
      
      catch (error) {
        setError('There was a problem fetching the products. Please try again later.');
      }
    };

    fetchProducts();
  }, [page]);

  const handleImageError = () => {
    setImageError(true);
  };
  const handleAddToCart = (product: ProductProps, index: number) => {
    addToCart(product, index);
    handleButtonClicks(index, true);
  };

  const fetchMoreData = () => {
    if (hasMore) {
      setTimeout(() => {
        setPage(prevPage => prevPage + 1);
      }, 2000);
    }
  };


  if (error) {
    return (
      <ErrorPage
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      {imageError ? (
        <ErrorPage message='Failed to load Image, try again' />
      ) : (
        <div>
          <img
            src={banner}
            onError={handleImageError}
            alt='banner'
            className='banner-img'
          />
          <h1 className='heading'>Products on sale!!</h1>
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<p>Loading...</p>}
            endMessage={<p>You are all set!</p>}
          >
            <div className="container">
              <div className="row">
                {products.length > 0 ? products.map((product, index) => (
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

                        <button
                          className={`btn btn-primary button-card ${buttonClickList[index] ? 'hidden' : ''}`}
                          onClick={() => handleAddToCart(product, index)}
                        >
                          Add to cart
                        </button>

                        <div
                          className={`container text-center container-cust ${buttonClickList[index] ? '' : 'hidden'}`}
                        >
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
                      </div>
                    </div>
                  </div>
                )) : (
                  <ErrorPage message="No Products Available, check again" />
                )}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default ProductContainer;
