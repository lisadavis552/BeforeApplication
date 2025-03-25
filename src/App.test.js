import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  render(<App />); // Render the App component directly without wrapping it in a Router

  // Check if some text is rendered to confirm the app is rendering properly
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument(); // Assuming that 'Loading...' is initially displayed in Home
});