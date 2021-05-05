import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createdOrder } from '../actions/orderActions'
import CheckOutSteps from '../components/CheckOutSteps'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

export default function PlaceOrderScreen(props) {

    const cart = useSelector((state) => state.cart)
    if (!cart.paymentMethod) {
        props.history.push('/payment')
    }

    const orderCreate = useSelector(state => state.orderCreate)
    const { loading, error, success, order } = orderCreate

    const toPrice = (num) => Number(num.toFixed(2))

    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch()

    const placeOrderHandler = () => {
        dispatch(createdOrder({ ...cart, orderItems: cart.cartItems }))
    }

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [dispatch, order, props.history, success])

    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}

                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Ordered Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                <div>${cart.itemsPrice}</div>
                            </li>
                            <li className='row'>
                                <div>Shipping</div>
                                <div>${cart.shippingPrice}</div>
                            </li>
                            <li className='row'>
                                <div>Tax</div>
                                <div>${cart.taxPrice}</div>
                            </li>
                            <li className='row'>
                                <div><strong>Total</strong></div>
                                <div>${cart.totalPrice}</div>
                            </li>
                            <li>
                                <button type='button' onClick={placeOrderHandler} className='primary block'
                                    disabled={cart.cartItems.length === 0}>
                                    Place Order
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant='danger'>{error}</MessageBox>}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
