import Header from "../header";
import Footer from "../footer";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";

import "./app.css";

const App = () => {
  const todoData = [
    { label: "Have fun", important: false, id: 1 },
    { label: "Have fun", important: true, id: 2 },
    { label: "Have fun", important: false, id: 3 },
  ];
  return (
    <div className="todoapp">
      <div className="header">
        <Header />
        <NewTaskForm />
      </div>
      <div className="main">
        <TaskList todos={todoData} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
