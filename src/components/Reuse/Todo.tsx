import React from 'react';

interface TodoProps {
  task: string;
  onClickCheck: () => void;
  onTaskClick: () => void;
}

const Todo: React.FC<TodoProps> = ({ task, onClickCheck, onTaskClick }) => {
  return (
    <div className="todoList" onClick={onTaskClick}>
      <div className="checkBox" onClick={(e) => { e.stopPropagation(); onClickCheck(); }}></div>
      <h6>{task}</h6>
    </div>
  );
};

export default Todo;
