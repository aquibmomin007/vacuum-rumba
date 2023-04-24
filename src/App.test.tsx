import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

test('renders app element', async () => {
  act(() => {
    render(<App />);
  })
  const appElement = await waitFor(() => screen.getByTestId("app"));
  expect(appElement).toBeInTheDocument();
});
