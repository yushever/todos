import "./task.css";
import { formatDistanceToNow } from "date-fns";
const date = formatDistanceToNow(new Date("August 25, 2022 12:52:30"), {
  includeSeconds: true,
});

const Task = ({ label, important = false }) => {
  const style = {
    color: important ? "tomato" : "black",
  };
  return (
    <div className="todo-list view">
      <input className="toggle" type="checkbox"></input>
      <label>
        <span className="description">{label}</span>
        <span className="created">created {date} ago</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};
export default Task;
