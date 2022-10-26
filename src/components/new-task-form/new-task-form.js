import React, { useState } from 'react';
import './new-task-form.css';

const NewTaskForm = (props) => {
  const [value, setValue] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeMin = (event) => {
    if (event.target.value.length > 2) {
      alert('Слишком много минут!');
      return;
    }
    setMin(event.target.value);
  };

  const handleChangeSec = (event) => {
    if (event.target.value.length > 2) {
      alert('Слишком мало секунд!');
      return;
    }
    setSec(event.target.value);
  };

  const onEnter = (event) => {
    if (event.key === 'Enter' && value.length > 0 && !value.startsWith(' ')) {
      props.onAdded(value, min, sec);
      setValue('');
      setMin('');
      setSec('');
    }
  };

  return (
    <form className="new-todo-form">
      <input
        value={value}
        onChange={(e) => handleChange(e)}
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={(e) => onEnter(e)}
      />
      <input
        type="number"
        value={min}
        onChange={(e) => handleChangeMin(e)}
        className="new-todo-form__timer"
        placeholder="Min"
        onKeyDown={(e) => onEnter(e)}
      />
      <input
        type="number"
        value={sec}
        onChange={(e) => handleChangeSec(e)}
        className="new-todo-form__timer"
        placeholder="Sec"
        onKeyDown={(e) => onEnter(e)}
      />
    </form>
  );
};

export default NewTaskForm;
