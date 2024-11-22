import { useState } from 'react';
import './LogInPage.css'

function LogInPage() {

    const [authForm, setAuthForm] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    function submitHandler(e){
        e.preventDefault();
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
                            <input type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <label htmlFor="password">Password :</label>
                            <input type="password" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input type="submit" value='Log In'/>
                        </>
                    ) : (
                        <>
                            <h2>Sign In</h2>
                            <label htmlFor="username">Username :</label>
                            <input type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <label htmlFor="password">Password :</label>
                            <input type="password" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <label htmlFor="password">Repeat Password :</label>
                            <input type="password" id='password' name='password' value={password2} onChange={(e) => setPassword2(e.target.value)}/>
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