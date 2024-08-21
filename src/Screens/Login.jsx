import { TextField } from '@mui/material';
import Style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorShown, setErrorShown] = useState(false);
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    function handleSubmit(event) {
        event.preventDefault();
        if (email === '' || password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Please Fill Required Fields',
                text: 'Both fields are required!',
            });
            setEmail('');
            setPassword('');
            setErrorShown(true);
            return;
        }
        const storedData = localStorage.getItem('UserData');
        if (storedData) {
            const userData = JSON.parse(storedData);
            const user = userData.find((user) => user.Email === email && user.Password === password);
            if (user) {
                const obj = {
                    Email: user.Email,
                    Password: user.Password,
                };

                localStorage.setItem('UserLogin', JSON.stringify(obj));
                const existingData = JSON.parse(localStorage.getItem('UserData')) || [];
                const updatedData = existingData.map(u => u.Email === user.Email ? obj : u);
                localStorage.setItem('UserData', JSON.stringify(updatedData));

                setErrorShown(false);
                navigate('/dashboard');
            } else {
                if (!errorShown) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Credentials',
                        text: 'Email or password is incorrect!',
                    });
                    setErrorShown(true);
                }
                setEmail('');
                setPassword('');
            }
        } else {
            if (!errorShown) {
                Swal.fire({
                    icon: 'error',
                    title: 'No User Data Found',
                    text: 'No user data available in local storage!',
                });
                setErrorShown(true);
            }
            setEmail('');
            setPassword('');
        }
    }

    return (
        <div className={Style.main}>
            <div className={Style.Login}>
                <form className={Style.form} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <br />
                    <br />
                    <TextField
                        id='outlined-basic'
                        label='Enter your Email'
                        type='email'
                        variant='outlined'
                        onChange={handleEmailChange}
                        className={Style.Input}
                    />
                    <br />
                    <br />
                    <TextField
                        id='outlined-basic'
                        label='Password'
                        type='password'
                        variant='outlined'
                        onChange={handlePasswordChange}
                        className={Style.Input}
                    />
                    <br />
                    <br />
                    <p>
                        Create New <Link to='/'>Account</Link>
                    </p>
                    <button type='submit' className={Style.btn}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Login;