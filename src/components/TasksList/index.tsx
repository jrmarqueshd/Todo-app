import { FaTrash } from "react-icons/fa";

import { capitalizeFirstLetter } from "../../helpers/strings";

import { TasksListProps } from "./interfaces";

export default function TasksList ({ tasks, options, onNextStepTask, onRemoveTask }: TasksListProps) {
  const { icon: Icon, taskGroup, nextStep } = options;

  return (
    <ul className="task-list">
      {!tasks.filter(task => task.status === taskGroup).length && <p>{capitalizeFirstLetter(taskGroup)} section is empty.</p>}

      {tasks?.map(({id, label, status}) => status === taskGroup && (
        <li key={id}>
          {label}
          <div className="buttons-wrapper">
            {Icon && (
              <Icon data-testid="icon-check" className="icon-check" onClick={() => onNextStepTask(id, nextStep)} />
            )}
            <FaTrash data-testid="icon-remove" className="icon-remove" onClick={() => onRemoveTask(id)} />
          </div>
        </li>
      )).reverse()}
    </ul>
  )
}