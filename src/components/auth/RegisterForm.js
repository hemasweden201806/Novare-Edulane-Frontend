import { Checkbox } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    console.log(isTeacher);
  }, [isTeacher]);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Sign up</h4>
        <div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <Checkbox
              checked={isTeacher}
              onChange={e => setIsTeacher(!isTeacher)}
              name="checkedB"
              color="primary"
            />
            <button
              className="btn btn-success"
              onClick={e => onSubmit({ name, email, password, isTeacher })}>
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
