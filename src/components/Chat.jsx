import { useState } from 'react';
import axios from 'axios';
import {io} from 'socket.io-client'
import './Chat.css'

import { UserContext } from '../contexts/UserWrapper';

import ChatCard from './ChatCard';
import { useContext } from 'react';
import { useEffect } from 'react';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Chat() {

    const {user} = useContext(UserContext);
    const [hidden, setHidden] = useState(true)
    const [messageInput, setMessageInput] = useState('')
    const [messages, setMessages] = useState([])
    const [modifying, setModifying] = useState(null);
    const [socket, setSocket] = useState(null);

    if(!socket){
        setSocket(io(WEBSOCKET_URL));
        
    }

    function modifyMessage(message){
        setModifying(message);
        setMessageInput(message.message);
    }

    async function getMessages() {
        try {
            const {data} = await axios.get(BASE_URL+'/messages', {withCredentials: true});
            setMessages(data);
            // console.log(data);
        } catch (e){
            console.log('ERROR: ', e)
        }
    }

    useEffect(() => {
        getMessages();
        socket.io.on('receiveMessage', (message) => {
            onReceive(message);
        })
    }, [socket])

    function handleAddMessage(event){
        event.preventDefault();

        if(modifying){
            // TODO : make a request to update the message;
            setMessageInput('');
            setModifying(null);
            return
        }

        // Updating the state on the io receiving funtion doesn't seems to work, maybe try to receive the whole messages list from the server
        socket.io.emit('sendMessage', [...messages, {
            id: Date.now(),
            user: user,
            message: messageInput,
        }]);
        setMessageInput('');
    }


    function onReceive(message) {
        console.log(message)
        setMessages(message)
        // console.log(message, messages);
    }


    return ( 
        <>
            <button className="chatButton" onClick={() => setHidden(!hidden)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
            </button>
            { !hidden ?
                <div className='Chat'>
                    <div className='container'>
                        {
                            messages.map((message, index) => <ChatCard key={message.id}  message={message} modifyMessage={modifyMessage}/>)
                        }
                        
                    </div>
                    {modifying && <div className="modifying"><svg xmlns="http://www.w3.org/2000/svg" onClick={() => {setModifying(null); setMessageInput("")}} viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>Modifying message...</div>}
                    <form className='input' onSubmit={handleAddMessage}>
                        <input type="text" name="message" id="message" placeholder='Chat with others !' value={messageInput} onChange={(e) => setMessageInput(e.target.value)}/>
                        <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                        </button>
                    </form>
                </div>
                : ''
            }
        </>
     );
}

export default Chat;