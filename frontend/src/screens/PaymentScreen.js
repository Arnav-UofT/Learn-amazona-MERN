import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'

export default function PaymentScreen(props) {

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress.address) {
        props.history.push('/shipping')
    }
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }
    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type='radio' id='paypal' value='PayPal' name='paymentMethod'
                            required checked onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor='paypal'>PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type='radio' id='option2' value='Option 2' name='paymentMethod'
                            required onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor='option2'>Pay Option 2</label>
                    </div>
                </div>
                <div>
                    <button className='primary' type='submit'>Continue</button>
                </div>
            </form>
        </div>
    )
}
