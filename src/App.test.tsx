import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe("App tests", () => {

  it('Should render correctly', () => {
    render(<App />);

    expect(screen.getByText("Todo App", {selector: "h1"})).toBeInTheDocument();
    expect(screen.getByText("by Junior Marques", {selector: 'a[href="https://ofrontender.dev"]'})).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Insert a task")).toBeInTheDocument();
    expect(screen.getByText("Add task")).toBeInTheDocument();
    expect(screen.getByText("To-do (0)")).toBeInTheDocument();
    expect(screen.getByText("Done (0)")).toBeInTheDocument();
    expect(screen.getByText("To-do section is empty.")).toBeInTheDocument();
  });

  it("Should Insert tasks correctly", async () => {
    const {debug} = render(<App />);

    const input = screen.getByPlaceholderText("Insert a task");
    userEvent.type(input, "task test")
   
    const button = screen.getByText("Add task", {selector: 'button[type="submit"]'});
    userEvent.click(button);

    debug();

    expect(screen.getByText("task test")).toBeInTheDocument();
  })
})
