import {IonButton, IonContent, IonHeader, IonPage, IonTabButton, IonTitle, IonToolbar} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen className="content">
                <div className="page-content">
                    <p>Chat App</p>

                    <div className="buttons">
                        <IonButton routerLink="/login" className="loginButton">Login</IonButton>
                        <IonButton routerLink="/register" className="registerButton">Registration</IonButton>
                    </div>

                </div>

            </IonContent>
        </IonPage>
    );
};

export default Home;
