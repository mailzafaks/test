import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase";

const auth = firebase.auth();

const PrivateRoute: React.FC<{
    component: React.FC<any>,
    path: string,
    exact: boolean
}> = ({component, path, exact}) => {
    const [user] = useAuthState(auth);

    return user ? (<Route path={path} exact={exact} component={component}/>) :
        (<Redirect to="/login"/>);
};


export default PrivateRoute;
