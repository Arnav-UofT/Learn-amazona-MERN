import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SigninScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault() // prevent reset
        // TODO signin actions
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
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
                    <label></label>
                    <button className='primary' type='submit'>
                        Sign In
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer? {' '}
                        <Link to='/register'>Create an Account</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}
