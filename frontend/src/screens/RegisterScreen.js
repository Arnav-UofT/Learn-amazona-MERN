import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerAction } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function RegisterScreen(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault() // prevent reset
        if (password !== confirmPassword) {
            alert('Passwords do Not Match')
        }
        else {
            dispatch(registerAction(name, email, password))
        }
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}

                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' placeholder='Enter Name'
                        required onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' id='email' placeholder='Enter Email'
                        required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='passwrod'>Password</label>
                    <input type='password' id='password' placeholder='Enter Password'
                        required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='confirmPasswrod'>Confirm Password</label>
                    <input type='password' id='confirmPasswrod' placeholder='Confirm Password'
                        required onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label></label>
                    <button className='primary' type='submit'>
                        Register User
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an Account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Create an Account</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}
