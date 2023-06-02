import { useEffect, useState , useContext} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

// @ts-ignore
const AuthGuard = (Component: () => JSX.Element) =>
  function HOC() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
    const { username } = useContext(UserContext);

    useEffect(() => {
      const token = localStorage.getItem('token')
      if( token) {
        setIsAuthenticated(true)
        return
      }
      setIsAuthenticated(false)
    },[isAuthenticated])

    if (isAuthenticated) {
      return <Component />;
    }
    return <Navigate to="/login" />;
  };

export default AuthGuard;
