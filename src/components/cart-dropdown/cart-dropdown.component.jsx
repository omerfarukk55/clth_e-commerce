
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import React from 'react';
import Button from '../button/button.component';
import './cart-dropdown.style.scss';
import CartItem from '../cart-item/cart-item.component';


const CartDropdown = () => {
  const {cartItems} = useContext(CartContext);


  return (
    <div className='cart-dropdown-container'>
    <div className='cart-items'>
        {cartItems.map(item => <CartItem key= {item.id} cartItem = {item}/>)}
    </div>  
    <Button>SEPETİ KONTROL ET</Button>
    </div>
  )
}

export default CartDropdown
