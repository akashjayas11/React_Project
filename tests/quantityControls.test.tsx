import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductContainer from '../src/Components/Product/productContainer';
import { useCart } from '../src/Components/contexts/CartContext';
import React from 'react';
import '@testing-library/jest-dom';

// Mocking the `useCart` hook
vi.mock('../src/Components/contexts/CartContext', () => ({
  useCart: () => ({
    cartItems: [{ id: 1, title: 'Product 1', price: 10, description: '', category: '', image: '', quantity: 1 }],
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
    buttonClicks: vi.fn(),
    buttonClicked: [true], // Adjust based on expected button state
  }),
}));

describe('ProductContainer', () => {
  it('should display cart controls when a product is added to the cart', async () => {
    // Stubbing global fetch to return dummy product data
    vi.stubGlobal('fetch', () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, title: 'Product 1', price: 10, description: '', category: '', image: '' }
          ]),
      })
    );

    render(<ProductContainer />);
    
    // Wait for async fetch to complete
    await waitFor(() => {
      const addToCartButton = screen.getByText('Add to cart');
      fireEvent.click(addToCartButton);

      // Check that cart controls appear
      expect(screen.getByText('-')).toBeInTheDocument();
      expect(screen.getByText('+')).toBeInTheDocument();
    });
  });
});
