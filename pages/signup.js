import React, {useState, useEffect} from "react"
import {Button, Form, Icon, Message, Segment} from "semantic-ui-react"
import Link from 'next/link'
import catchErrors from "../utils/catchErrors"
import axios from 'axios'
import baseUrl from "../utils/baseUrl"
import { handleLogin } from "../utils/auth"

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
}

function Signup() {
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
      // make a request to signup user
      const url = `${baseUrl}/api/signup`
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
        icon="settings"
        header="Get Started"
        content="Create an account"
        color="teal"
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
            icon="user" 
            iconPosition="left" 
            label="Name" 
            placeholder="Name" 
            name="name" 
            type="text"
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
          <Button icon="signup" type="submit" color="orange" content="Sign up" disabled={disabled || loading}/>
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon nem="help"/>
        Existing user? {" "}
        <Link href="/login">
          <a>Login here...</a>
        </Link>
        instead
      </Message>
    </>
  );
}

export default Signup;
