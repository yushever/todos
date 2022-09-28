import React from 'react';

import Header from '../header';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';

import './app.css';

class App extends React.Component {
  state = {
    todoData: [],
    filter: 'all',
  };
  componentDidMount() {
    const newTodos = this.getTodo();
    this.setState(() => {
      return {
        todoData: newTodos,
      };
    });
  }
  componentDidUpdate() {
    this.saveTodo();
  }
  saveTodo() {
    localStorage.setItem('todoData', JSON.stringify(this.state.todoData));
  }
  getTodo() {
    const getTodos = JSON.parse(localStorage.getItem('todoData'));

    if (getTodos) {
      return getTodos;
    } else return [];
  }

  createTodoTask(label, min, sec) {
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
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      if (todoData[idx].interval) {
        clearInterval(todoData[idx].interval);
      }
      return {
        todoData: newArray,
      };
    });
  };

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.completed);
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text, min, sec) => {
    const newItem = this.createTodoTask(text, min, sec);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      clearInterval(oldItem.interval);
      const newItem = { ...oldItem, completed: !oldItem.completed, interval: null };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onSelected = (text) => {
    this.setState(() => {
      return {
        filter: text,
      };
    });
  };

  updateTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      todoData[idx].minutes =
        Number(todoData[idx].seconds) === 59 ? Number(todoData[idx].minutes) + 1 : todoData[idx].minutes;
      todoData[idx].seconds = Number(todoData[idx].seconds) === 59 ? 0 : Number(todoData[idx].seconds) + 1;
      return {
        todoData,
      };
    });
  };

  startTimer = (id) => {
    const idx = this.state.todoData.findIndex((el) => el.id === id);
    console.log('timer');
    if (this.state.todoData[idx].completed || this.state.todoData[idx].interval) {
      return;
    }
    this.setState(({ todoData }) => {
      const oldItem = todoData[idx];

      let interval = setInterval(() => this.updateTimer(id), 1000);
      console.log(interval);
      const newItem = { ...oldItem, interval: interval };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };

      // if (!todoData[idx].interval) {
      //   let interval = setInterval(() => this.updateTimer(id), 1000);
      //   todoData[idx].interval = interval;
      // }
      // return {
      //   todoData,
      // };
    });
  };

  clearTimer = (id) => {
    const idx = this.state.todoData.findIndex((el) => el.id === id);
    this.setState(({ todoData }) => {
      const oldItem = todoData[idx];
      clearInterval(todoData[idx].interval);
      const newItem = { ...oldItem, interval: null };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });

    // this.setState(({ todoData }) => {
    //   const idx = todoData.findIndex((el) => el.id === id);
    //   if (todoData[idx].interval) {
    //     clearInterval(todoData[idx].interval);
    //     todoData[idx].interval = null;
    //   }
    //   return {
    //     todoData,
    //   };
    // });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.completed).length;
    const toDoCount = todoData.length - doneCount;

    let filteredToDoData = todoData;
    if (this.state.filter === 'active') {
      filteredToDoData = todoData.filter((el) => !el.completed);
    }
    if (this.state.filter === 'completed') {
      filteredToDoData = todoData.filter((el) => el.completed);
    }

    return (
      <div className="todoapp">
        <div className="header">
          <Header />
          <NewTaskForm onAdded={this.addItem} />
        </div>
        <div className="main">
          <TaskList
            todos={filteredToDoData}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            startTimer={this.startTimer}
            clearTimer={this.clearTimer}
          />
          <Footer
            toDo={toDoCount}
            filter={this.state.filter}
            onSelected={this.onSelected}
            deleteCompletedItems={this.deleteCompletedItems}
          />
        </div>
      </div>
    );
  }
}

export default App;
