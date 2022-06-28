import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Nav from './components/Nav';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ weather: 'sunny' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterEach(cleanup);
afterAll(() => server.close());

test('user input', () => {
  render(<Nav />);
  const input = screen.getByRole('textbox');
  userEvent.type(input, '12345');
  expect(input).toHaveValue('12345');
});

test('submit when pressing enter', () => {
  const onZipSubmit = jest.fn();
  const { getByRole } = render(<Nav onZipSubmit={onZipSubmit} />);
  const input = getByRole('textbox');
  userEvent.type(input, 'testcity{enter}');
  userEvent.type(input, '12345{enter}');
  expect(onZipSubmit).toHaveBeenCalledTimes(2);
});

// test('fetch data', async () => {
//   const mockThing = jest.mock();
//   act(() => {
//     render(<Nav />, container);
//   });
//   mockThing.mockImplementation(() => {
//     return { weather: 'sunny' };
//   });
//   expect(container.textContent).toBe('');
//   expect(container.textContent).toBe('sunny');
// });
