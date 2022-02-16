import PersonIcon from '@material-ui/icons/Person';
import './ListOfChats.css'
import React, {useEffect, useState} from 'react';
import {auth, firestore} from "../../services/firebase-service";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {IonContent, IonPage} from "@ionic/react";
import {Redirect} from "react-router-dom";

const ListOfChats: React.FC = () => {
    const user = localStorage.getItem('user');
    const uid = user ? JSON.parse(user).uid : false;

    const [goToUserChat, setGoToUserChat] = useState(null);

    const usersRef = firestore.collection('users');
    const query = usersRef.limit(25).where("userId", "!=", uid);
    const [users] = useCollectionData(query, {idField: 'id'});
    console.log(users?.length)


    if (goToUserChat) {
        return <Redirect to={`chat/${goToUserChat}`}/>
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                {users && users.length > 0 ? users.map((user: any) =>
                        user.userId == uid ? <span key={user.userId}></span> :
                            <div className="list-of-chats-items" key={user.userId}
                                 onClick={e => setGoToUserChat(user.userId)}>
                                {user.photoUrl && user.photoUrl != 'url' ?
                                    <img className="list-of-chats-item-img" src={user.photoUrl}/>
                                    : <PersonIcon/>}
                                <p style={{marginLeft: '1rem'}}>{user.firstName}</p>
                            </div>
                    ) :
                    <div>There is no users yet!</div>}
            </IonContent>
        </IonPage>
    );
};
export default ListOfChats;

