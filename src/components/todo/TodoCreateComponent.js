import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TodoApi from '../../api/TodoApi';

//Using Functional components to Create a student todo list.
function StudentCreateComponent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const history = useHistory();

  //Creation of the Todolist
  const createTodo = async event => {
    event.preventDefault();
    const todo = { title, description, dueDate, complete: false };
    await TodoApi.createTodo(todo);
    history.push('/todo-list');
  };

  return (
    <div className="container">
      <form onSubmit={event => createTodo(event)}>
        <div className="card">
          <div className="card-header bg-secondary text-white">
            <h4>Create Todo</h4>
            <span style={{ color: 'red' }}>{null}</span>
          </div>

          <div className="card-body">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="form-control"
              placeholder="Enter a Title"
            />
            <span style={{ color: 'red' }}>{null}</span>
            <br />

            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="form-control"
              placeholder="Enter a Description"
            />
            <span style={{ color: 'red' }}>{null}</span>
            <br />

            <label>Due Date:</label>
            <input
              type="text"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="form-control"
              placeholder="Enter a due date"
            />
            <span style={{ color: 'red' }}>{null}</span>
            <br />
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentCreateComponent;
