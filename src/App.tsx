import React, { useCallback, useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { FaTrash, FaCheck } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

import './App.css';

interface Task {
  id: string;
  label: string;
  status: 'done' | 'to-do'
}

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

  const handleRemoveTask = useCallback((taskId: string) => {
    setTasks([...tasks.filter(task => task.id !== taskId)]);

    toast(`The task has been deleted.`, {
      icon: '❕'
    });
  }, [tasks]);

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

  const handleCloseTask = useCallback((taskId: string) => {
    setTasks([...tasks.map((task): Task => {
      if (task.id !== taskId) return task;
      
      return {
        ...task,
        status: "done"
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

        <Tabs>
          <TabList>
            <Tab>To-do</Tab>
            <Tab>Done</Tab>
          </TabList>
        
          <TabPanel>
            <ul className="task-list">
              {!tasks.filter(task => task.status === "to-do").length && <p>To-do section is empty.</p>}

              {tasks?.map(({id, label, status}) => status === "to-do" && (
                <li key={id}>
                  {label}
                  <div className="buttons-wrapper">
                    <FaCheck className="icon-check" onClick={() => handleCloseTask(id)} />
                    <FaTrash className="icon-remove" onClick={() => handleRemoveTask(id)} />
                  </div>
                </li>
              )).reverse()}
            </ul>
          </TabPanel>

          <TabPanel>
            <ul className="task-list">
              {!tasks.filter(task => task.status === "done").length && <p>Done section is empty.</p>}

              {tasks?.map(({id, label, status}) => status === "done" && (
                <li key={id}>
                  <label className={status} htmlFor="task-1">
                    <input type="checkbox" name="task-checkbox" id={id} /> {label}</label>
                    <FaTrash onClick={() => handleRemoveTask(id)} />
                  </li>
              ))}
            </ul>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
