import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput} from '@ionic/react';
import '../Home.css';
import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {firestore, registerUser, storageRef} from './../../services/firebase-service';
import './Registration.css';
import {toast} from "../../toast";


const Registration: React.FC = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        photoUrl: ''
    });
    const [file, setFile] = useState(new Blob());
    const [goToChat, setGoToChat] = useState(false);


    const userDataChanged = (target: any) => {
        if (target.name == 'photoUrl') {
            setFile(target.files[0]);
            setUserData({...userData, [target.name]: 'url'})
        } else
            setUserData({...userData, [target.name]: target.value});
    }

    async function register() {

        if (userData.photoUrl === 'url') {
            //const fileRef = storageRef.child(userData.email);
            await storageRef.child(userData.email).put(file);
            const url = await storageRef.child(userData.email).getDownloadURL();
            setUserData({...userData, 'photoUrl': url})
            userData.photoUrl = url;
        }

        const result = await registerUser(userData);
        if (!result) {
            await toast("Your registration failed, please enter all data!")
        } else {
            await toast("You register successfully!")
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
                <div className="registration-form">
                    <IonInput name="email" placeholder="email" onIonChange={(e: any) => userDataChanged(e.target)}/>
                    <IonInput name="password" placeholder="password"
                              onIonChange={(e: any) => userDataChanged(e.target)}/>
                    <IonInput name="firstName" placeholder="First Name"
                              onIonChange={(e: any) => userDataChanged(e.target)}/>
                    <IonInput name="lastName" placeholder="Last Name"
                              onIonChange={(e: any) => userDataChanged(e.target)}/>
                    <input name="photoUrl" type="file" onChange={(e: any) => userDataChanged(e.target)}/>

                    <IonButton onClick={register}>Register</IonButton>

                    <p>Already registered? <Link to="/login">Login</Link></p>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default Registration;
