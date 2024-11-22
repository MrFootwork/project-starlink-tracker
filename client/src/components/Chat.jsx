import { useState } from 'react';
import './Chat.css'

function Chat() {

    const [hidden, setHidden] = useState(true)


    return ( 
        <>
            <button className="chatButton" onClick={() => setHidden(!hidden)}>Chat</button>
            { !hidden ?
                <div className='Chat'>
                    
                </div>
                : ''
            }
        </>
     );
}

export default Chat;