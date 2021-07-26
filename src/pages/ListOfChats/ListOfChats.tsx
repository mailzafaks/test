import React, {Fragment, useEffect, useState} from 'react';
import {auth, firestore} from "../../services/firebase-service";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase";
import {IonContent, IonPage} from "@ionic/react";
import ChatMessage from "../Chat/ChatMessage";
import {Redirect} from "react-router-dom";

const ListOfChats: React.FC = () => {
    const uid = auth.currentUser?.uid;

    const usersRef = firestore.collection('users');
    const query = usersRef.limit(25);
    const [users] = useCollectionData(query, { idField: 'id' });

    const [goToUserChat, setGoToUserChat] = useState(null);

    if(goToUserChat){
        return <Redirect to={`chat/${goToUserChat}`}/>
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                {users && users.map((user:any) =>
                    user.userId == uid ? <span key={user.userId}></span> :
                    <div key={user.userId} onClick={e => setGoToUserChat(user.userId)}>{user.firstName}</div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ListOfChats;

