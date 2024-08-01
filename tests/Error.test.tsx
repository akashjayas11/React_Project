import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductContainer from '../src/Components/Product/productContainer';
import ErrorPage from '../src/Components/Error/errorPage'; // Import ErrorPage to verify its display
import React from 'react';
import '@testing-library/jest-dom';

// Stub global fetch to simulate a fetch failure
vi.stubGlobal('fetch', () =>
  Promise.resolve({
    ok: false,
    json: () => Promise.reject(new Error('Failed to fetch')),
  })
);

describe('ProductContainer', () => {
  it('should display an error message when fetching products fails', async () => {
    render(<ProductContainer />);

    // Wait for the component to attempt fetching and handle the error
    await waitFor(() => {
      // Verify that the ErrorPage component is rendered
      expect(screen.getByText('There was a problem fetching the products. Please try again later.')).toBeInTheDocument();
    });
  });
});
