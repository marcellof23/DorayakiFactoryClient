import { Redirect, Route } from "react-router-dom";
import useUser from "../context/UserContext";

const PrivateRoute = ({
  component: RouteComponent,
  ...rest
}: any) => {
  const { user, loading } = useUser();

  return (
    <Route
      {...rest}
      render={(_) => (loading || (!loading && user) ?
        <RouteComponent /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
