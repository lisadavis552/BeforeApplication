import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios';

// Mock geolocation for Home component
beforeAll(() => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn((success) => {
      success({
        coords: { latitude: 40.7128, longitude: -74.0060 } // Mocked coordinates for New York
      });
    }),
  };
});

// Mock Axios for Search component
jest.mock('axios');

test('renders home page and fetches weather data', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Wait for the weather data to be displayed
  await waitFor(() => {
    expect(screen.getByText(/You are currently in/)).toBeInTheDocument();
    expect(screen.getByText(/Latitude/)).toBeInTheDocument();
  });
});

test('renders search page and fetches weather data on search', async () => {
  // Mock axios.get to simulate successful response
  axios.get.mockResolvedValueOnce({
    data: {
      main: { feels_like: 25 },
      weather: [{ description: 'Clear sky' }],
    },
  });

  render(
    <MemoryRouter initialEntries={['/search']}>
      <App />
    </MemoryRouter>
  );

  // Type a query into the search input field
  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'London' } });

  // Simulate a search button click
  const searchButton = screen.getByRole('button', { name: /search/i });
  fireEvent.click(searchButton);

  // Wait for the weather data to be displayed
  await waitFor(() => {
    expect(screen.getByText(/Clear sky/)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();
  });
});

test('handles error on search failure', async () => {
  // Mock axios.get to simulate error response
  axios.get.mockRejectedValueOnce({
    response: { status: 404 },
  });

  render(
    <MemoryRouter initialEntries={['/search']}>
      <App />
    </MemoryRouter>
  );

  // Type a query into the search input field
  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'NonexistentCity' } });

  // Simulate a search button click
  const searchButton = screen.getByRole('button', { name: /search/i });
  fireEvent.click(searchButton);

  // Wait for the error message to be displayed
  await waitFor(() => {
    expect(screen.getByText(/Weather data for NONEXISTENTCITY could not be found!/)).toBeInTheDocument();
  });
});