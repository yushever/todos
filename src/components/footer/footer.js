import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <span className="todo-count">1 items left</span>
      <div>
        <TasksFilter />
      </div>
      <button className="clear-completed">Clear completed</button>
    </div>
  );
};
export default Footer;
