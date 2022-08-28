import Header from "../header";
import Footer from "../footer";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import React from "react";

import "./app.css";

class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoTask("Drink coffee"),
      this.createTodoTask("Drink beer"),
      this.createTodoTask("Go swimming"),
    ],
    filter: "all",
  };

  createTodoTask(label) {
    return {
      label,
      completed: false,
      id: this.maxId++,
      createTime: Date.now(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

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

  addItem = (text) => {
    const newItem = this.createTodoTask(text);

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
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];

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

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.completed).length;
    const toDoCount = todoData.length - doneCount;

    let filteredToDoData = todoData;
    if (this.state.filter === "active") {
      filteredToDoData = todoData.filter((el) => !el.completed);
    }
    if (this.state.filter === "completed") {
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
