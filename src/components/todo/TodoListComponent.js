import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import TodoApi from '../../api/TodoApi';

function TodoListComponent() {
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState(0);

  //React.useEffect hook takes a function as an argument and it will call that function after the main render cycle has completed

  useEffect(() => {
    const getTodos = async () => {
      const response = await TodoApi.getTodos();
      setTodos(responseSorter(response.data));
    };
    getTodos();
  }, [update]);

  //Sorting the tasks

  const responseSorter = response => {
    return response.sort((a, b) =>
      a.complete > b.complete ? -1 : a.complete < b.complete ? 1 : 0
    );
  };

  //Updating of the taks

  const updateComplete = async todo => {
    await TodoApi.updateTodo({ ...todo, complete: !todo.complete });
    setUpdate(value => value + 1);
  };

  const deleteTodo = async id => {
    console.log(id);

    await TodoApi.deleteTodo(id);
    setUpdate(value => value + 1);
  };

  //Calling the functions ...

  const jsxTodos = todos.map(todo => {
    return (
      <tr key={uuid()}>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.dueDate}</td>
        <td>{todo.complete ? <i className="fas fa-check" /> : null}</td>
        <td>
          <button
            type="submit"
            onClick={() => deleteTodo(todo.id)}
            className="btn btn-info">
            <i className="fas fa-trash-alt" />
          </button>
        </td>
        <button
          type="submit"
          onClick={() => updateComplete(todo)}
          className="btn btn-info">
          <i className="fas fa-clipboard-check"></i>
        </button>
      </tr>
    );
  });

  //Using a table to display the list of the tasks in a table format.
  return (
    <div className="container">
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h4>Todo List</h4>
        </div>

        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Due Date</td>
                <td>Complete</td>
              </tr>
            </thead>
            <tbody>{jsxTodos}</tbody>
          </table>
        </div>
        <div className="card-footer">
          <Link to="/todo-form" className="btn btn-danger">
            Create
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TodoListComponent;
