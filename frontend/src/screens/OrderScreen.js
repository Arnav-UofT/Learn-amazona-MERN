import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector, } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsOrder } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function OrderScreen(props) {
    const orderId = props.match.params.id
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { loading, error, order } = orderDetails
    const dispatch = useDispatch()
    useEffect(() => {
        const addPaymentScirpt = async () => {
            const { data } = await Axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.come/sdk/js?client-id=${data}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        console.log(orderId)

        if (!order) {
            dispatch(detailsOrder(orderId))
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPaymentScirpt()
                } else {
                    setSdkReady(true)
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady])

    const successPaymentHandler = () => {
        // dipatch pay
    }

    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant='danger'>{error}</MessageBox>)
            :
            (
                <div>
                    <h1>Order {order._id}</h1>
                    <div className='row top'>
                        <div className='col-2'>
                            <ul>
                                <li>
                                    <div className='card card-body'>
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                            <strong>Address:</strong> {order.shippingAddress.address},
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ? <MessageBox variant='success'>Delivered at {order.deliveredAt}</MessageBox>
                                            : <MessageBox variant='danger'>Not Delivered</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className='card card-body'>
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method: </strong>{order.paymentMethod}
                                        </p>
                                        {order.isPaid ? <MessageBox variant='success'>Paid on {order.paidAt}</MessageBox>
                                            : <MessageBox variant='danger'>Not Paid</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className='card card-body'>
                                        <h2>Ordered Items</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className='row'>
                                                        <div>
                                                            <img src={item.image} alt={item.name} className='small'></img>
                                                        </div>
                                                        <div className='min-30'>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div>
                                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='col-1'>
                            <div className='card card-body'>
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li className='row'>
                                        <div>Items</div>
                                        <div>${order.itemsPrice}</div>
                                    </li>
                                    <li className='row'>
                                        <div>Shipping</div>
                                        <div>${order.shippingPrice}</div>
                                    </li>
                                    <li className='row'>
                                        <div>Tax</div>
                                        <div>${order.taxPrice}</div>
                                    </li>
                                    <li className='row'>
                                        <div><strong>Total</strong></div>
                                        <div>${order.totalPrice}</div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                { !sdkReady ? (<LoadingBox></LoadingBox>)
                                                    : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>)}
                                            </li>
                                        )
                                    }
                                    {/* <li>
                                        <button type='button' onClick={placeOrderHandler} className='primary block'
                                            disabled={order.cartItems.length === 0}>
                                            Place Order
                                </button>
                                    </li> */}
                                    {/* {loading && <LoadingBox></LoadingBox>}
                                    {error && <MessageBox variant='danger'>{error}</MessageBox>} */}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}
