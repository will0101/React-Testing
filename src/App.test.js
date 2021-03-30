import App, { Search } from './App';
import { fireEvent, render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    screen.getByText('Search:');
    expect(screen.getByText('Search:')).toBeInTheDocument();
    expect(screen.getByText(/Search:/)).toBeInTheDocument();
  });

  it("gets the searchbox by role", () => {
    render(<App/>)
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  })

  it("should fail since text is not in the document", () => {
    render(<App/>)
    // We use queryBy* here since getByText fails before hitting the assertion
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  })

  it("should find text after a fetching some data", async () => {
    render(<App/>)
    expect(screen.queryByText(/Signed in as/)).toBeNull();
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  })


  it("should have the right value after fireEvent is called", async () => {
    render(<App/>)
    await screen.findByText(/Signed in as/);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  })



  it("should have the right value after userEvent is called", async () => {
    render(<App/>)
    await screen.findByText(/Signed in as/);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  })
});


describe('Search', () => {
  test('calls the onChange callback handler', async () => {
    const onChange = jest.fn();
 
    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );
 
    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');
 
    expect(onChange).toHaveBeenCalledTimes(10);
  });
});