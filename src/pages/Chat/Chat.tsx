import {IonPage, IonContent} from "@ionic/react";
import ChatMessage from "./ChatMessage";
import {useEffect, useRef, useState} from "react";
import {auth, firestore} from "../../services/firebase-service";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase";
import {RouteComponentProps, useLocation, useParams} from "react-router";
import {v4 as uuid} from "uuid";

interface ChatProps
    extends RouteComponentProps<{
        id: string;
    }> {
}

const Chat: React.FC<ChatProps> = ({match}) => {

    const {id} = match.params;
    const uid = auth.currentUser?.uid;

    const [formValue, setFormValue] = useState('');
    const [file, setFile] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});
    const [ref, setRef] = useState(firestore.collection("messages").doc(id + uid));


    const usersRef = firestore.collection('users');
    const query = usersRef.where('userId', '==', id).limit(1);
    const [users] = useCollectionData(query, {idField: 'id'});

    useEffect(() => {
        if (users) setUser(users[0])
        ref.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                data?.messages.sort((a: any, b: any) => {
                    const nanoA = a.createdAt.nanoseconds ? a.createdAt.nanoseconds : 0;
                    const secA = a.createdAt.seconds ? a.createdAt.seconds : 0;
                    const nanoB = b.createdAt.nanoseconds ? b.createdAt.nanoseconds : 0;
                    const secB = b.createdAt.seconds ? b.createdAt.seconds : 0;
                    let dateA: any = new Date(secA * 1000 + nanoA / 1000000);
                    let dateB: any = new Date(secB * 1000 + nanoB / 1000000);
                    return dateA - dateB;
                });

                setMessages(data?.messages.slice(-25));
            } else {
                const docRef = firestore.collection("messages").doc(uid + id);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        setRef(firestore.collection("messages").doc(uid + id));
                        let data = doc.data();
                        data?.messages.sort((a: any, b: any) => {
                            const nanoA = a.createdAt.nanoseconds ? a.createdAt.nanoseconds : 0;
                            const secA = a.createdAt.seconds ? a.createdAt.seconds : 0;
                            const nanoB = b.createdAt.nanoseconds ? b.createdAt.nanoseconds : 0;
                            const secB = b.createdAt.seconds ? b.createdAt.seconds : 0;
                            let dateA: any = new Date(secA * 1000 + nanoA / 1000000);
                            let dateB: any = new Date(secB * 1000 + nanoB / 1000000);
                            return dateA - dateB;
                        });

                        setMessages(data?.messages.slice(-25));
                    } else {
                        firestore.collection("messages").doc(uid + id).set({messages: []})
                        setRef(firestore.collection("messages").doc(uid + id));
                    }
                })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    });

    const addAttachment = async (target: any) => {
        setFile(target.files[0]);

    }

    const sendMessage = async (e: any) => {
        e.preventDefault();

        const photoURL = auth.currentUser?.photoURL;

        await ref.update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                text: formValue,
                sender: uid,
                createdAt: firebase.firestore.Timestamp.now(),
                id: uuid(),
                photoURL: photoURL
            })
        });
        setFormValue('');
    }


    return (
        <IonPage>
            <IonContent fullscreen>
                {messages && messages.length > 0 ? messages.map((msg: any, index:number) =>
                    <ChatMessage key={msg.id}
                                 user={ user
                                    /* msg.sender === msg[index - 1].sender ? {} : user*/
                                 }
                                 message={msg}/>) : <></>}
                <form onSubmit={sendMessage}>
                    <input value={formValue} onChange={(e) => setFormValue(e.target.value)}
                           placeholder="say something nice"/>
                    <input type="file" onChange={(e: any) => addAttachment(e.target)} placeholder="Attachment"/>
                    <button type="submit" disabled={!formValue}>SEND</button>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Chat;
