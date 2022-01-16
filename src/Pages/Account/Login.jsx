import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
export const Login = () => {
  const { loginWithCredentials, error } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    loginWithCredentials(email, password);
  };

  return (
    <>
      {/* <h1>This is login page</h1> */}
      <form
        onSubmit={submitHandler}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '6rem auto',
          padding: '4rem',
          border: '2px solid #f0f0f0',
        }}
      >
        <label>
          Email:{' '}
          <input
            type='text'
            name='email'
            placeholder='Enter your email here'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className='email__error'>{error && error.email}</div>
        <br />
        <br />
        <label>
          Password:{' '}
          <input
            type='password'
            name='password'
            placeholder='Enter your password here'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className='password__error'>{error && error.password}</div>
        <br />
        <input type='submit' value='Login' />
        <p>
          <NavLink
            style={{
              textDecoration: 'none',
              color: '#3B82F6',
            }}
            to='/signup'
          >
            Create an account
          </NavLink>
        </p>
      </form>
    </>
  );
};
