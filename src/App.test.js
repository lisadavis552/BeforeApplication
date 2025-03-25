import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /learn react/i });  // Using getByRole to target links by text
  expect(linkElement).toBeInTheDocument();
});
