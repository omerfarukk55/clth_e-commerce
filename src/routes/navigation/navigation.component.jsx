import { Fragment, useContext} from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context"; 
import { CartContext } from "../../contexts/cart.context";
import {signOutuser} from "../../utils/firebase/firebase.utils"

import { NavigationContainer, NavLink,NavLinks,LogoContainer } from "./navigation.styles";


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)
  
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            Alışveriş
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutuser}>Çıkış</NavLink>
              ) : (<NavLink to="/auth"> 
              Giriş
            </NavLink>
            )
          }
          
         <CartIcon/> 
          
        </NavLinks>
        {isCartOpen &&<CartDropdown/>}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
