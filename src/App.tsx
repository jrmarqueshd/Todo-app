import React, { useCallback, useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import toast, { Toaster } from "react-hot-toast";
import 'react-tabs/style/react-tabs.css';

import TasksList from "./components/TasksList";
import { Status, Task, TaskId } from "./components/TasksList/interfaces";
import TabsPanel from "./components/TabsPanel";

import './App.css';
import { FaCheck, FaFontAwesomeFlag } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null)

  const validateTask = useCallback((newTask: string | undefined) => {
    return new Promise((resolve, reject) => {
      if (!inputRef.current?.value?.trim()) {
        reject("Please insert a value.")
      };

      if(tasks.some(task => task.label === newTask)) {
        reject("This task has already been added.");
      }

      resolve(true);
    })
  }, [tasks])

  const handleSubmitTask = useCallback(async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const newTask = inputRef.current?.value || ""

      await validateTask(newTask);

      setTasks((prevTasks) => {
        return [
          ...prevTasks,
          {
            id: uuidv4(),
            label: newTask,
            status: "to-do"
          }
        ]
      })

      toast.success("Task added with success!")
    } catch (err) {
      toast.error(err as string)
    }
    
  }, [validateTask]);

  const handleRemoveTask = useCallback((taskId: TaskId) => {
    setTasks([...tasks.filter(task => task.id !== taskId)]);

    toast(`The task has been deleted.`, {
      icon: '❕'
    });
  }, [tasks]);

  const handleNextStepTask = useCallback((taskId: TaskId, nextStatus?: Status) => {
    setTasks([...tasks.map((task): Task => {
      if (task.id !== taskId) return task;
      
      return {
        ...task,
        status: nextStatus || "done"
      };
    })]);

    toast(`The task closed with success`, {
      icon: '🚀'
    });
  }, [tasks])

  return (
    <div className="container">
      <div className="task-board">
        <Toaster 
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#434343',
              color: '#fff'
            }
          }} 
          position="top-right" 
        />

        <header className="task-header">
          <h1>Todo App</h1> <a href="https://ofrontender.dev">by Junior Marques</a>
        </header>

        <form onSubmit={handleSubmitTask} className="task-form">
          <label htmlFor="task"></label>
          <input type="text" name="task-input" id="task" ref={inputRef} />
          <button type="submit">Add task</button>
        </form>

        <TabsPanel 
          tabItems={[
            {
              tabtitle: "To-do",
              tabContent: <TasksList 
                tasks={tasks}
                options={{
                  taskGroup: "to-do",
                  nextStep: "in-progress",
                  icon: FaFontAwesomeFlag
                }}
                onNextStepTask={handleNextStepTask}
                onRemoveTask={handleRemoveTask}
              />
            },
            {
              tabtitle: "In-progress",
              tabContent: <TasksList 
                tasks={tasks}
                options={{
                  taskGroup: "in-progress",
                  nextStep: "done",
                  icon: FaCheck
                }}
                onNextStepTask={handleNextStepTask}
                onRemoveTask={handleRemoveTask}
              />
            },
            {
              tabtitle: "Done",
              tabContent: <TasksList 
                tasks={tasks}
                options={{
                  taskGroup: "done"
                }}
                onNextStepTask={handleNextStepTask}
                onRemoveTask={handleRemoveTask}
              />
            }
          ]}
        />       
      </div>
    </div>
  );
}

export default App;
