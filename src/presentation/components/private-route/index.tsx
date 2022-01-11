import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  return <Route {...props} component={() => <Redirect to="/login" />}/>
}

export default PrivateRoute
