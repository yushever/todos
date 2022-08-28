import Task from "../task";
import "./task-list.css";

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <div key={id} className="todo-list">
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </div>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
