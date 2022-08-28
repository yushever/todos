import TasksFilter from "../tasks-filter";
import "./footer.css";
import React from "react";

class Footer extends React.Component {
  render() {
    const { toDo, filter, onSelected, deleteCompletedItems } = this.props;

    return (
      <div className="footer">
        <span className="todo-count">{toDo} items left</span>
        <div>
          <TasksFilter filter={filter} onSelected={onSelected} />
        </div>
        <button
          onClick={() => deleteCompletedItems()}
          className="clear-completed"
        >
          Clear completed
        </button>
      </div>
    );
  }
}
export default Footer;
