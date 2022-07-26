import React, { useCallback, useState } from "react";
import { FaCheck } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import 'react-tabs/style/react-tabs.css';
import {v4 as uuidv4} from 'uuid';

import TasksList from "./components/TasksList";
import { Status, Task, TaskId } from "./components/TasksList/interfaces";
import TabsPanel from "./components/TabsPanel";

import './App.css';
import Search from "./components/Inputs/Search";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const validateTask = useCallback((newTask: string | undefined) => {
    return new Promise((resolve, reject) => {
      if (!newTask?.trim()) {
        reject("Please insert a value.")
      };

      if(tasks.some(task => task.label === newTask)) {
        reject("This task has already been added.");
      }

      resolve(true);
    })
  }, [tasks])

  const tasksLength = useCallback((statusRef: Status) => {
    return tasks.filter(task => task.status === statusRef)?.length
  }, [tasks])

  const handleSubmitTask = useCallback(async (newTask: string) => {
    try {
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

        <Search 
          id="task" 
          name="task-Input" 
          placeholder="Insert a task"
          onSubmit={handleSubmitTask} 
        />

        <TabsPanel 
          tabItems={[
            {
              tabtitle: `To-do (${tasksLength("to-do")})`,
              tabContent: <TasksList 
                tasks={tasks}
                options={{
                  taskGroup: "to-do",
                  nextStep: "done",
                  icon: FaCheck
                }}
                onNextStepTask={handleNextStepTask}
                onRemoveTask={handleRemoveTask}
              />
            },
            {
              tabtitle: `Done (${tasksLength("done")})`,
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
