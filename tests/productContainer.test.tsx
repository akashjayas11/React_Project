import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductContainer from '../src/Components/Product/productContainer';
import { useCart } from '../src/Components/contexts/CartContext';
import React from 'react';

vi.mock('../src/Components/contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    cartItems: [],
    buttonClicks: vi.fn(),
    buttonClicked: [],
  }),
}));

describe('ProductContainer', () => {
  it('should render product items after fetching', async () => {

    vi.stubGlobal('fetch', () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { 
              id: 2,
              title: 'Mens Casual Premium Slim Fit T-Shirts',
              price: 22.3,
              description: 'Slim-fitting style, contrast raglan long sleeve, t-shirt with a round neckline includes a three-button placket.',
              image: 'https://fakestoreapi.com/img/1.jpg'
            }
          ]),
      })
    );

    render(<ProductContainer />);
    
    
    await waitFor(() => {
      expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts')).toBeInTheDocument();
      expect(screen.getByText('Price')).toBeInTheDocument();
      expect(screen.getByText('$22.3')).toBeInTheDocument();
    });
  });

});

