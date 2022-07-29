import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Search from "."

describe("Search test", () => {
  it("Should render correctly", () => {
    render(<Search 
      id="task" 
      name="task-Input" 
      placeholder="Insert a task" 
      onSubmit={() => {}} 
    />);

    expect(screen.getByPlaceholderText("Insert a task")).toBeInTheDocument();
    expect(screen.getByText("Add task")).toBeInTheDocument();
  })

  it("Should insert value in input and submit correctly and clear input after", () => {
    const onSubmitMocked = jest.fn();

    render(<Search 
      id="task" 
      name="task-Input" 
      placeholder="Insert a task" 
      onSubmit={onSubmitMocked} 
    />);

    const input = screen.getByPlaceholderText("Insert a task");
    const button = screen.getByText("Add task");
    userEvent.type(input, "task test")
    expect(input).toHaveValue("task test");
    userEvent.click(button)
    expect(onSubmitMocked).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("");
  })
})