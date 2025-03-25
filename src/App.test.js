import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading state', async () => {
  render(<App />);  // Render the App component

  // Use findByText to wait for the "Loading..." text to appear
  const loadingText = await screen.findByText(/Loading.../i);

  // Assert that the "Loading..." text is in the document
  expect(loadingText).toBeInTheDocument();
});