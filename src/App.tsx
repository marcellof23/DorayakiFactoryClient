import { BrowserRouter as Router, Route, RouteProps, Switch } from "react-router-dom";
import { privateRoutes, routes } from "./routes";
import PrivateRoute from "./components/PrivateRoute";
import Page404 from "./pages/404";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((routeProps: RouteProps, index: number) => (
          <Route exact {...routeProps} key={index} />
        ))}
        {privateRoutes.map((privateRouteProps: RouteProps, index: number) => (
          <PrivateRoute {...privateRouteProps} key={`privateRoute-${index}`} />
        ))}
        <Route component={Page404} />
      </Switch>
    </Router>
  )
}

export default App
