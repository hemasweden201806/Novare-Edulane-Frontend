import Api from './Api';

class AuthApi {
  authenticate({ email, password }) {
    return Api.post('/authenticate', { email, password });
  }

  register({ name, email, password, isTeacher }) {
    const role = isTeacher === true ? 'teacher' : 'student';
    return Api.post('/register', { name, email, password, role });
  }
}

export default new AuthApi();
