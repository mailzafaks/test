import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput} from '@ionic/react';
import './Login.css';
import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {loginUser, signInWithGoogle} from './../../services/firebase-service';
import {toast} from "../../toast";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [goToChat, setGoToChat] = useState(false);

    async function login() {
        const result = await loginUser(email, password);
        if (!result) {
            await toast("Your credentials are invalid, please register!")
        } else {

            console.log("result", result)

            await toast("You logged in successfully!")
            setGoToChat(true);
        }
    }


    if(goToChat){
        //return <Redirect to="chat"/>;
        return <Redirect to="list"/>;
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="login-form">
                    <IonInput placeholder="email"
                              onIonChange={(e: any) => setEmail(e.target.value)}/>
                    <IonInput placeholder="password"
                              onIonChange={(e: any) => setPassword(e.target.value)}/>
                    <IonButton onClick={login}>Login</IonButton>
                    <IonButton onClick={signInWithGoogle}>Login With Google</IonButton>

                    <p>You don't have account? <Link to="/register">Register</Link></p>
                </div>


            </IonContent>
        </IonPage>
    );
};

export default Login;
