import './ChatCard.css';

import { UserContext } from '../contexts/UserWrapper';
import { useContext } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ChatCard({ message, modifyMessage }) {
	const { user } = useContext(UserContext);

	async function handleDelete() {
		console.log('deleted message with id : ', message.id);
		await axios.delete(`${BASE_URL}/message/${message.id}`);
	}

	function handleUpdate() {
		console.log('updated message with id : ', message.id);
		modifyMessage(message);
	}

	return (
		<div className='ChatCard'>
			<img src={message.user?.image ? message.user.image : ''} alt='' />
			<div className='informations'>
				<h3>{message.user.username}</h3>
				<p>{message.deleted ? <i style={{textDecoration: 'line-through'}}>'Message deleted'</i> : message.message}</p>
			</div>
			{user.username === message.user.username && (
				<>
					<svg
						className='modify'
						onClick={handleUpdate}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 512 512'
					>
						<path d='M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z' />
					</svg>
					<svg
						className='delete'
						onClick={handleDelete}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 448 512'
					>
						<path d='M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z' />
					</svg>
				</>
			)}
		</div>
	);
}

export default ChatCard;
