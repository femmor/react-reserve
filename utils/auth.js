import cookie from "js-cookie"
import Router from "next/router"

// handleLogin helper
export function handleLogin(token) {
  cookie.set('token', token)
  Router.push('/account')
}

// redirect helper
export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end();
  } else {
    Router.push(location)
  }
}

export const handleLogout = () => {
  cookie.remove('token')
  Router.push('/login')
}