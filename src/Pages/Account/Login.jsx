import { useAuth } from '../../Context/AuthContext';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TextField } from '@mui/material';
import './Account.css';
export const Login = () => {
  const { loginWithCredentials } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    loginWithCredentials(email, password);
  };

  return (
    <div className='login'>
      <form
        onSubmit={submitHandler}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '4rem auto 2rem auto',
          padding: '4rem',
          border: '2px solid #f0f0f0',
          width: '20rem',
        }}
      >
        <h2>Login</h2>
        <br />
        <TextField
          id='standard__basic'
          label='Email'
          type='text'
          name='email'
          helperText='Enter your email here'
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />

        <br />
        <br />

        <TextField
          id='standard__basic'
          label='Password'
          type='password'
          name='password'
          helperText='Enter your password here'
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
        />

        {/* <div className='name__error'>{errorMessage !== '' && errorMessage}</div> */}
        <br />
        {/*Login button*/}
        <input type='submit' value='LOGIN' id='login__btn__outlined' />
        <br />
        <p>
          <NavLink
            style={{
              textDecoration: 'none',
              color: 'black',
            }}
            activeStyle={{ fontWeight: 'bold' }}
            to='/signup'
          >
            Create an account
          </NavLink>
        </p>
      </form>
    </div>
  );
};
