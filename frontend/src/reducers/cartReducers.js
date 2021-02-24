import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENY_METHOD, CART_SAVE_SHIPPING, CART_UPDATE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        // x.product === existItem.product ? item : x
                        x.product === existItem.product ? { ...existItem, qty: x.qty + item.qty } : x
                        // x.product === existItem.product ? existItem.qty += item.qty : x THIS IS WROGN LOGIC - CART WILL HAVE OBJECT 'number'
                    )
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case CART_UPDATE_ITEM:
            const newitem = action.payload
            return {
                ...state,
                cartItems: state.cartItems.map(x =>
                    x.product === newitem.product ? { ...newitem, qty: newitem.qty } : x
                )
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING:
            return { ...state, shippingAddress: action.payload }
        case CART_SAVE_PAYMENY_METHOD:
            return { ...state, paymentMethod: action.payload }
        default:
            return state
    }
}