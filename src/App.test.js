import { render, screen } from '@testing-library/react';
import App from './App';

test('renders movesense link', () => {
  render(<App />);
  const linkElement = screen.getByText(/movesense/i);
  expect(linkElement).toBeInTheDocument();
});
