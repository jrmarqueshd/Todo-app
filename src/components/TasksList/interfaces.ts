import React from "react";
import { IconType } from "react-icons";

export type Status = 'done' | 'in-progress' | 'to-do';

export type TaskId = string;

export type Callbacks = (taskId: TaskId, nextStep?: Status) => void

export interface Task {
  id: string;
  label: string;
  status: Status;
}

export interface TasksListOptions {
  taskGroup: Status,
  icon?: IconType,
  nextStep?: Status
}

export interface TasksListProps { 
  tasks: Task[];
  options: TasksListOptions,
  onNextStepTask: Callbacks; 
  onRemoveTask: Callbacks; 
}