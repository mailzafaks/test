import React, {Fragment, useEffect, useState} from 'react';
import {auth} from "../../services/firebase-service";
import firebase from "firebase";
import '../../App.css'

const ChatMessage: React.FC<{message: any, user: any}> = ({message, user}) => {
    const {text, sender, photoURL, createdAt} = message;
    const [messageClass, setMessageClass] = useState('received');

    useEffect(() => {
        setMessageClass(sender === auth.currentUser?.uid ? 'sent' : 'received');
    })

    const getDate = (nano: any, sec: any) =>{
        const date = new Date(sec * 1000 + nano/1000000);
        return date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }

    return (
        <div className={`message ${messageClass}`}>
            {messageClass == 'received' ? <span>{user.firstName}: </span> : <></>}
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}/>
            <div><div>{text}</div>
                <span>{getDate(createdAt.nanoseconds, createdAt.seconds)}</span></div>
        </div>
    );
};

export default ChatMessage;
