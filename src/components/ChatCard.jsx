import './ChatCard.css'


function ChatCard({message}) {
    

    return ( 
        <div className="ChatCard">
            <img src="" alt="" />
            <div className='informations'>
                <h3>{message.user}</h3>
                <p>{message.message}</p>
            </div>
        </div>
     );
}

export default ChatCard;