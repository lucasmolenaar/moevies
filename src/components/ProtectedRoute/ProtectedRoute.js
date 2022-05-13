import React, {useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {

    const { user } = useContext(AuthContext);

    if (!user) {
      return <Redirect to='/' />
    }

    return children;
};

export default ProtectedRoute;