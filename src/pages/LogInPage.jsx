import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogInPage.css'
import axios from 'axios';



import { UserContext } from '../contexts/UserWrapper';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;


function LogInPage() {
    const navigate= useNavigate();

    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate('/sky');
        }
    }, [user]);

    const [authForm, setAuthForm] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);


    function uploadImage(files){
        console.log(files)
        const formData = new FormData();
        formData.append('files', files[0]);
        formData.append('upload_preset', 'xapfpqhi')
        // axios.post('https://api.cloudinary.com/v1_1/dss1n04re/image/upload', formData, {withCredentials: false, headers: {'Access-Control-Allow-Origin': ''}}).then(response => console.log(response));
    }

    async function submitHandler(e){
        e.preventDefault();
        try {

            if(authForm === 'login'){
                const {data} = await axios.post(BASE_URL+'/login', {username: username, password: password});
                if(data){
                    setUser(data.resUser);
                    console.log(data);
                }
                return;
            }
            const response = await axios.post(BASE_URL+'/signin', {username: username, password: password, password2: password2});
            if(response.status === 201){
                const {data} = await axios.post(BASE_URL+'/login', {username: username, password: password});
                if(data){
                    setUser(data.resUser);
                    console.log(data);
                }
            }
        } catch (e){
            console.log('ERROR: ', e);
        }
    }


    return ( 
        <div className="LogInPage">
            <div className='container'>
                
                <form onSubmit={submitHandler}>
                    <div className='logsign'>
                        <button onClick={(e) => {e.preventDefault(); setAuthForm('login')}}>Log In</button>
                        <button onClick={(e) => {e.preventDefault(); setAuthForm('signin')}}>Sign In</button>
                    </div>
                    {authForm === 'login' ?
                    (
                        <>
                            <h2>Log In</h2>
                            <label htmlFor="username">Username :</label>
                            <input required type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <label htmlFor="password">Password :</label>
                            <input required type="password" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input type="submit" value='Log In'/>
                        </>
                    ) : (
                        <>
                            <h2>Sign In</h2>
                            <label htmlFor="username">Username :</label>
                            <input required type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <label htmlFor="password">Password :</label>
                            <input required type="password" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <label htmlFor="password">Repeat Password :</label>
                            <input required type="password" id='password' name='password' value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                            <label htmlFor="profilepicture"></label>
                            <input type="file" name='profilepicture' id='profilepicture' onChange={(e) => uploadImage(e.target.files)}/>
                            <input type="submit" value='Sign In'/>
                        </>
                    )
                    }
                </form>
            </div>
        </div>
     );
}

export default LogInPage;