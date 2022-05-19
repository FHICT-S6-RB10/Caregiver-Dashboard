import { render, screen } from '@testing-library/react';
import App from './App';

test('renders swsp link', () => {
  render(<App />);
  const linkElement = screen.getByText(/swsp/i);
  expect(linkElement).toBeInTheDocument();
});
