import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Reuse/Header';
import Todo from '../Reuse/Todo';
import Done from '../Reuse/Done';

interface TodoItem {
  id: string;
  task: string;
}

const Main: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [doneTasks, setDoneTasks] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now().toString(), task: inputValue }]);
      setInputValue('');
    }
  };

  const handleMarkAsDone = (todo: TodoItem) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setDoneTasks([...doneTasks, todo]);
  };

  const handleMarkAsTodo = (task: TodoItem) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
    setTodos([...todos, task]);
  };


  const handleTodoClick = (id: string, task: string) => {
    navigate(`/detail/${id}`, { state: { task } });
  };
  

  return (
    <div className="mainWrap">
      <Header />
      <div className="mainInnerBox">
        <div className="addWrap">
          <input
            type="text"
            placeholder="할 일을 추가하세요."
            className="addTodo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="addBtn" onClick={handleAddTodo}>
            추가하기
          </button>
        </div>
        <div className="listWrap">
          <div className="TodoWrap">
            <div className="todoTitle">Todo</div>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <Todo
                  key={todo.id}
                  task={todo.task}
                  onClickCheck={() => handleMarkAsDone(todo)}
                  onTaskClick={() => handleTodoClick(todo.id, todo.task)}
                />
              ))
            ) : (
              <div className="ifNotTodo">
                <div className="inNotTodoImg"></div>
                <div className="inNotTodotxt">
                  할 일이 없어요. <br />
                  TODO를 새롭게 추가해주세요!
                </div>
              </div>
            )}
          </div>
          <div className="DoneWrap">
            <div className="doneTitle">Done</div>
            {doneTasks.length > 0 ? (
              doneTasks.map((done) => (
                <Done
                  key={done.id}
                  task={done.task}
                  onClickCheck={() => handleMarkAsTodo(done)}
                />
              ))
            ) : (
              <div className="ifNotDone">
                <div className="inNotDoneImg"></div>
                <div className="inNotDonetxt">
                  아직 다 한 일이 없어요.
                  <br />
                  해야 할 일을 체크해보세요!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
