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

  it("Should insert value in input and submit correctly", () => {
    const onSubmitMocked = jest.fn();

    render(<Search 
      id="task" 
      name="task-Input" 
      placeholder="Insert a task" 
      value="task test"
      onSubmit={onSubmitMocked} 
    />);

    const input = screen.getByPlaceholderText("Insert a task");
    const button = screen.getByText("Add task");
    userEvent.click(button)
    expect(input).toHaveValue("task test");
    expect(onSubmitMocked).toHaveBeenCalledTimes(1);
  })
})