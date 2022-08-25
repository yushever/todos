import "./new-task-form.css";

const NewTaskForm = () => {
  const newTaskFormStyle = {
    fontSize: "20px",
  };
  return (
    <input
      className="new-todo"
      style={newTaskFormStyle}
      placeholder="What needs to be done?"
    />
  );
};
export default NewTaskForm;
