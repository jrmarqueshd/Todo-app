import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FaTimes } from "react-icons/fa"
import TasksList from "."
import { Task, TasksListOptions } from "./interfaces"

describe("TasksList test", () => {
  const tasks: Task[] = [{
    id: "fake-id",
    label: "task of test",
    status: "to-do"
  }]

  const options: TasksListOptions = { taskGroup: "to-do", icon: FaTimes }

  it("Should render empty state correctly", async () => {
    render(<TasksList 
      onNextStepTask={() => {}} 
      onRemoveTask={() => {}} 
      options={{...options}}
      tasks={[]} 
    />);

    expect(screen.getByText("To-do section is empty.")).toBeInTheDocument();
  })

  it("Should render tasks correctly", async () => {
    render(<TasksList 
      onNextStepTask={() => {}} 
      onRemoveTask={() => {}} 
      options={{...options}}
      tasks={[...tasks]} 
    />);

    expect(screen.getByText("task of test")).toBeInTheDocument();
    expect(screen.getByTestId("icon-check")).toBeInTheDocument();
    expect(screen.getByTestId("icon-remove")).toBeInTheDocument();
  })

  it("Should called remove or nextstep when handle", async () => {
    const nextStepMocked = jest.fn()
    const removeMocked = jest.fn()

    render(<TasksList 
      onNextStepTask={nextStepMocked} 
      onRemoveTask={removeMocked} 
      options={{...options}}
      tasks={[...tasks]} 
    />);

    userEvent.click(screen.getByTestId("icon-check"));
    expect(nextStepMocked).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByTestId("icon-remove"));
    expect(removeMocked).toHaveBeenCalledTimes(1);
  })

  it("Should render tasks without check icon", async () => {
    const optionsWithoutIcon = { ...options  };
    delete optionsWithoutIcon.icon;

    render(<TasksList 
      onNextStepTask={() => {}} 
      onRemoveTask={() => {}} 
      options={{...optionsWithoutIcon}}
      tasks={[...tasks]} 
    />);

    expect(screen.getByText("task of test")).toBeInTheDocument();
    expect(screen.getByTestId("icon-remove")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-check")).toBeNull();
  })
})