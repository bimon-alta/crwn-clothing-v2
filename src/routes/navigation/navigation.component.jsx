import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from '../../assets/yinyang-lotus.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';



const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  // kapanpun user Sign In/Out, state currentUser berubah
  // setiap state berubah MAKA KOMPONEN APAPUN YG LISTENING THD STATE tsb
  // akan ikut dirender ulang.
  // console.log('current user : ', currentUser);



  // const signOutHandler = async () => {
  //   // const res = await signOutUser();
  //   // // console.log('signout : ', res);
  //   await signOutUser();
  //   setCurrentUser(null);
  // }

  // blok kode di atas dinonaktifkan, karena sdh pake fitur Observer nya Firebase
  // yg otomatis mendeteksi perubahan state user di user context


  const { isCartOpen } = useContext(CartContext);
  
  return (
    <Fragment>  {/** Komponen Fragment berguna jika kita tidak ingin wrapper suatu komponen dirender di browser  (Syarat mutlak react adlh setiap komponen wajib diwrap minimal dgn div kosong)*/}
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {
            currentUser ? (
              // <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
              // blok kode di atas dinonaktifkan, karena sdh pake fitur Observer nya Firebase
              // yg otomatis mendeteksi perubahan state user di user context

              <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
            ) : (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }

          <CartIcon />
          
        </div>
        { isCartOpen && <CartDropdown /> }
      </div>
      <Outlet /> {/** disinilah Komponen Home, Shop, dan spesifik komponen per page ditampilkan */}
    </Fragment>
  );
  
}


export default Navigation;