import { TextField } from '@mui/material'
import Style from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'

function Signup() {
    const [FullName, setFullName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const handleFullNameChange = ((e)=>{setFullName(e.target.value)})
    const handleEmailChange = ((e)=>{setEmail(e.target.value)})
    const handlePasswordChange = ((e)=>{setPassword(e.target.value)})
    const handleConfirmPasswordChange = ((e)=>{setConfirmPassword(e.target.value)})

    const handleSubmit = (event) => {
        event.preventDefault()
        if (FullName === '' || Email === '' || Password === '' || ConfirmPassword === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all fields!",
            });
            return
        }
        if (Password !== ConfirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords do not match!",
            });
            return
        }
        const existingData = JSON.parse(localStorage.getItem('UserData')) || [];
        const isEmailTaken = existingData.some(user => user.Email === Email);
        const isNameTaken = existingData.some(user => user.FullName === FullName);
        if (isEmailTaken) {
            Swal.fire({
                icon: "error",
                title: "Email Taken",
                text: "An account with this email already exists!",
            });
            return
        }
        if (isNameTaken) {
            Swal.fire({
                icon: "error",
                title: "Name Taken",
                text: "An account with this name already exists!",
            });
            return
        }
        const newUser = {
            FullName: FullName,
            Email: Email,
            Password: Password
        };
        existingData.push(newUser);
        localStorage.setItem('UserData', JSON.stringify(existingData));
        setFullName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')

        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "You have successfully signed up!",
        }).then(() => {
            navigate('/dashboard');
        });
    }

    return (
        <>
            <div className={Style.main}>
                <div className={Style.Login}>
                    <form className={Style.form} onSubmit={handleSubmit}>
                        <h1>Signup</h1><br /><br />
                        <TextField
                            id='outlined-basic'
                            label="Full Name"
                            variant='outlined'
                            value={FullName}
                            onChange={handleFullNameChange}
                            className={Style.Input}
                        /><br /><br />
                        <TextField
                            id='outlined-basic'
                            label="Email"
                            variant='outlined'
                            value={Email}
                            onChange={handleEmailChange}
                            className={Style.Input}
                        /><br /><br />
                        <TextField
                            id='outlined-basic'
                            label="Password"
                            variant='outlined'
                            type="password"
                            value={Password}
                            onChange={handlePasswordChange}
                            className={Style.Input}
                        /><br /><br />
                        <TextField
                            id='outlined-basic'
                            label="Confirm Password"
                            variant='outlined'
                            type="password"
                            value={ConfirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={Style.Input}
                        /><br /><br />
                        <p>Already have an <Link to='/login'>Account</Link></p>
                        <button type="submit" className={Style.btn}>Signup</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup