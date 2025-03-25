import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page', () => {
  render(<App />);

  // Simply check if a basic text or element is rendered (for example, a heading)
  const linkElement = screen.getByText(/home/i);  // Adjust this text to something static in your app
  expect(linkElement).toBeInTheDocument();
});