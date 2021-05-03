import cookie from "js-cookie"
import Router from "next/router"

// handleLogin helper
export function handleLogin(token) {
  cookie.set('token', token)
  Router.push('/account')
}