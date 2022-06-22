import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from '../../assets/yinyang-lotus.svg';

import './navigation.styles.scss';



const Navigation = () => {
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
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet /> {/** disinilah Komponen Home, Shop, dan spesifik komponen per page ditampilkan */}
    </Fragment>
  );
  
}


export default Navigation;