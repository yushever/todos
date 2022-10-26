import React, { useState, useEffect } from 'react';

import Header from '../header';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';

import './app.css';

const App = () => {
  const [todoData, setData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const newTodos = getTodo();
    setData(newTodos);
  }, []);

  useEffect(() => {
    saveTodo();
  });

  const saveTodo = () => {
    localStorage.setItem('todoData', JSON.stringify(todoData));
  };
  const getTodo = () => {
    const getTodos = JSON.parse(localStorage.getItem('todoData'));

    if (getTodos) {
      return getTodos;
    } else return [];
  };

  const createTodoTask = (label, min, sec) => {
    if (min == '') {
      min = 0;
    }
    if (sec == '') {
      sec = 0;
    }
    return {
      label,
      completed: false,
      id: Math.floor(Math.random() * 100000),
      createTime: Date.now(),
      minutes: min,
      seconds: sec,
    };
  };

  const deleteItem = (id) => {
    setData((OldTodoData) => {
      const idx = OldTodoData.findIndex((el) => el.id === id);
      const newArray = [...OldTodoData.slice(0, idx), ...OldTodoData.slice(idx + 1)];
      if (OldTodoData[idx].interval) {
        clearInterval(OldTodoData[idx].interval);
      }
      return newArray;
    });
  };

  const deleteCompletedItems = () => {
    setData((OldTodoData) => {
      const newArray = OldTodoData.filter((el) => !el.completed);
      return newArray;
    });
  };

  const addItem = (text, min, sec) => {
    const newItem = createTodoTask(text, min, sec);
    setData((OldTodoData) => {
      const newArray = [...OldTodoData, newItem];
      return newArray;
    });
  };

  const onToggleDone = (id) => {
    setData((OldTodoData) => {
      const idx = OldTodoData.findIndex((el) => el.id === id);
      const oldItem = OldTodoData[idx];
      clearInterval(oldItem.interval);
      const newItem = { ...oldItem, completed: !oldItem.completed, interval: null };
      const newArray = [...OldTodoData.slice(0, idx), newItem, ...OldTodoData.slice(idx + 1)];
      return newArray;
    });
  };

  const onSelected = (text) => {
    setFilter(text);
  };

  const updateTimer = (id) => {
    setData((OldTodoData) => {
      const idx = OldTodoData.findIndex((el) => el.id === id);
      const oldItem = OldTodoData[idx];
      const min = Number(oldItem.seconds) === 59 ? Number(oldItem.minutes) + 1 : oldItem.minutes;
      const sec = Number(oldItem.seconds) === 59 ? 0 : Number(oldItem.seconds) + 1;
      const newItem = { ...oldItem, minutes: min, seconds: sec };
      const newArray = [...OldTodoData.slice(0, idx), newItem, ...OldTodoData.slice(idx + 1)];
      return newArray;
    });
  };

  const startTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    if (todoData[idx].completed || todoData[idx].interval) {
      return;
    }
    setData((OldTodoData) => {
      const oldItem = OldTodoData[idx];
      let interval = setInterval(() => updateTimer(id), 1000);
      const newItem = { ...oldItem, interval: interval };
      const newArray = [...OldTodoData.slice(0, idx), newItem, ...OldTodoData.slice(idx + 1)];
      return newArray;
    });
  };

  const clearTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    setData((OldTodoData) => {
      const oldItem = OldTodoData[idx];
      clearInterval(OldTodoData[idx].interval);
      const newItem = { ...oldItem, interval: null };
      const newArray = [...OldTodoData.slice(0, idx), newItem, ...OldTodoData.slice(idx + 1)];
      return newArray;
    });
  };

  const doneCount = todoData.filter((el) => el.completed).length;
  const toDoCount = todoData.length - doneCount;

  let filteredToDoData = todoData;
  if (filter === 'active') {
    filteredToDoData = todoData.filter((el) => !el.completed);
  }
  if (filter === 'completed') {
    filteredToDoData = todoData.filter((el) => el.completed);
  }

  return (
    <div className="todoapp">
      <div className="header">
        <Header />
        <NewTaskForm onAdded={addItem} />
      </div>
      <div className="main">
        <TaskList
          todos={filteredToDoData}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          startTimer={startTimer}
          clearTimer={clearTimer}
        />
        <Footer toDo={toDoCount} filter={filter} onSelected={onSelected} deleteCompletedItems={deleteCompletedItems} />
      </div>
    </div>
  );
};

export default App;
