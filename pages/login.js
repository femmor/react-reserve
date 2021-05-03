import React, {useState, useEffect} from "react"
import {Button, Form, Icon, Message, Segment} from "semantic-ui-react"
import Link from 'next/link'
import catchErrors from "../utils/catchErrors"
import baseUrl from "../utils/baseUrl"
import axios from 'axios'
import { handleLogin } from '../utils/auth'

const INITIAL_USER = {
  email: "",
  password: "",
}

function Login() {
  const [user, setUser] = useState(INITIAL_USER)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      // make a request to Login user
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)

    }
  }

  return(
    <>
      <Message
        attached
        icon="privacy"
        header="Welcome back!"
        content="Login with email and password"
        color="blue"
      />
      <Form onSubmit={handleSubmit} loading={loading} error={Boolean(error)}>
        <Message
          error
          header="Oops!"
          content={error}
        />
        <Segment>
          <Form.Input 
            fluid 
            icon="envelope" 
            iconPosition="left" 
            label="Email" 
            placeholder="Email" 
            name="email" 
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input 
            fluid 
            icon="lock" 
            iconPosition="left" 
            label="Password" 
            placeholder="Password" 
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button icon="sign in" type="submit" color="orange" content="Login" disabled={disabled || loading}/>
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon nem="help"/>
        New user? {" "}
        <Link href="/signup">
          <a>Signup here...</a>
        </Link>
        instead
      </Message>
    </>
  );
}

export default Login;
