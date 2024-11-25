import './ChatCard.css'


function ChatCard({message}) {
    

    return ( 
        <div className="ChatCard">
            <img src={message.user.image ? message.user.image : ''} alt="" />
            <div className='informations'>
                <h3>{message.user.username}</h3>
                <p>{message.message}</p>
            </div>
        </div>
     );
}

export default ChatCard;