import Api from './Api';

class TodoApi {
  getTodos() {
    return Api.get('/todo');
  }

  createTodo(todo) {
    return Api.post('/todo', todo);
  }

  updateTodo(todo) {
    return Api.put('/todo', todo);
  }

  deleteTodo(id) {
    return Api.delete(`/todo/${id}`);
  }
}

export default new TodoApi();
