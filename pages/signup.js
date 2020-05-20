import React, {useState, useEffect} from 'react';
import {Button, Form,  Icon, Message, Segment} from 'semantic-ui-react';
import axios from 'axios';
import Link from 'next/link';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  name: '',
  email: '',
  password: ''
}

function Signup() {
  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  },[user])

  function handleChange(event){
    const {name, value} = event.target;
    setUser((prevState) => ({...prevState, [name]: value}))
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      
      const url = `${baseUrl}/api/signup`;
      const payload =  {...user};
      const res = await axios.post(url, payload);
      handleLogin(res.data);
    } 
    catch (error) {
      catchErrors(error, setError);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Message 
        attached 
        icon="settings" 
        header="Get Started !" 
        content="Create a new account" 
        color="teal"
      />
      <Form onSubmit={handleSubmit} error={Boolean(error)} loading={loading}>
        <Message error header="Oops !" content={error}/>
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            value={user.email}
            type="email"
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            value={user.password}
            type="password"
            onChange={handleChange}
          />
          <Button
            icon="signup"
            type="submit"
            color="orange"
            content="Signup"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>

      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user ? {' '}
        <Link href="/login">
          <a>Login here</a>
        </Link> {' '} instead
      </Message>
    </>
  );
}

export default Signup;
