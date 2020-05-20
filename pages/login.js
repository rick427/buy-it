import React, {useState, useEffect} from 'react';
import {Button, Form,  Icon, Message, Segment} from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';

const INITIAL_USER = {
  email: '',
  password: ''
}

function Login() {
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
      console.log(user);

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
        icon="privacy" 
        header="Welcome Back!" 
        content="Login with email and password" 
        color="blue"
      />
      <Form onSubmit={handleSubmit} error={Boolean(error)} loading={loading}>
        <Message error header="Oops !" content={error}/>
        <Segment>
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
            color="green"
            content="Login"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>

      <Message attached="bottom" warning>
        <Icon name="help" />
        New user ? {' '}
        <Link href="/signup">
          <a>Sign up here</a>
        </Link> {' '} instead
      </Message>
    </>
  );
}

export default Login;
