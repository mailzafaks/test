import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase";
import {auth} from '../services/firebase-service';


const PrivateRoute: React.FC<{
    component: React.FC<any>,
    path: string,
    exact: boolean
}> = ({component, path, exact}) => {
    let user = localStorage.getItem('user');
    if(user) console.log("user:: ", JSON.parse(user))

    return user ? (<Route path={path} exact={exact} component={component}/>) :
        (<Redirect to="/login"/>);
};


export default PrivateRoute;
