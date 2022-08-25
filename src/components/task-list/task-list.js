import Task from "../task";
import "./task-list.css";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="todo-list">
        <Task {...itemProps} />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
