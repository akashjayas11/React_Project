import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductContainer from '../src/Components/Product/productContainer';
import React from 'react';

// Mock the CartContext
vi.mock('../src/Components/contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    cartItems: [],
    buttonClickList: [],
    handleButtonClicks: vi.fn(),
  }),
}));

// Mock the fetch function to return a paginated list
vi.stubGlobal('fetch', (url: string) => {
  const pageMatch = url.match(/page=(\d+)/);
  const page = pageMatch ? parseInt(pageMatch[1], 10) : 1;

  // Simulate pagination: return a different set of products based on the page number
  const products = [
    {
      id: 1,
      title: 'Mens Casual Premium Slim Fit T-Shirts',
      price: 22.3,
      description: 'Slim-fitting style, contrast raglan long sleeve, t-shirt with a round neckline includes a three-button placket.',
      category: 'men',
      image: 'https://fakestoreapi.com/img/1.jpg',
    },
    // Add more mock products here if needed
  ];

  // Simulate the API response
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(products),
  });
});

describe('ProductContainer', () => {
  it('should render product items after fetching', async () => {
    render(<ProductContainer />);

    // Wait for products to be rendered
    await waitFor(() => {
      expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts')).toBeInTheDocument();
      expect(screen.getByText('Price')).toBeInTheDocument();
      expect(screen.getByText('$22.3')).toBeInTheDocument();
    });
  });

  it('should display an error message when fetching fails', async () => {
    // Mock fetch to return an error response
    vi.stubGlobal('fetch', () => Promise.reject(new Error('Fetch failed')));

    render(<ProductContainer />);

    await waitFor(() => {
      expect(screen.getByText('There was a problem fetching the products. Please try again later.')).toBeInTheDocument();
    });
  });

  it('should display an error message if image fails to load', async () => {
    // Mock fetch to return a successful response
    vi.stubGlobal('fetch', () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            id: 1,
            title: 'Mens Casual Premium Slim Fit T-Shirts',
            price: 22.3,
            description: 'Slim-fitting style, contrast raglan long sleeve, t-shirt with a round neckline includes a three-button placket.',
            category: 'men',
            image: 'https://fakestoreapi.com/img/1.jpg',
          }
        ]),
      })
    );

    render(<ProductContainer />);

    // Simulate image load failure
    fireEvent.error(screen.getByAltText('banner'));

    await waitFor(() => {
      expect(screen.getByText('Failed to load Image, try again')).toBeInTheDocument();
    });
  });
});
