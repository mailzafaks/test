import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, { Suspense } from "react";
import Chat from "./pages/Chat/Chat";
import PrivateRoute from "./routing/PrivateRoute";
import {Fragment} from "ionicons/dist/types/stencil-public-runtime";
import ListOfChats from "./pages/ListOfChats/ListOfChats";

const App: React.FC = () => {


    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Router>
                            <Route path="/login" component={Login} exact/>
                            <section className="container">
                                <Switch>
                                    <Route exact path="/login" component={Login}/>
                                    <Route path="/register" component={Registration} exact/>
                                    <PrivateRoute exact path="/chat/:id" component={Chat}/>
                                    <PrivateRoute exact path="/list" component={ListOfChats}/>
                                </Switch>
                            </section>
                    </Router>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
