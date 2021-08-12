import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../../helpers/helpers';

const Layout = ({ children, match, history }) => {
    const isActive = path => {
        if (match.path === path) {
            return { color: '#000' };
        } else {
            return { color: '#fff' };
        }
    };

    const nav = () => (
        <ul className="nav nav-tabs bg-primary"> 
            {/* <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}>
                    Home
                </Link>
            </li> */}

            {!isAuth() && (
                <Fragment>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                            Signin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}

           {/* {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/admin')} to="/admin">
                        {isAuth().name}
                    </Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/private')} to="/private">
                        {isAuth().name}
                    </Link>
                </li>
            )} */}

            {isAuth()  && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/profile')} to="/profile">
                        {isAuth().name}
                    </Link>
                </li>
            )} 

            {isAuth() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: 'pointer', color: '#fff' }}
                        onClick={() => {
                            signout(() => {
                                history.push('/');
                            });
                        }}
                    >
                        Signout
                    </span>
                </li>
            )}
             {isAuth() && (
               <Fragment>
               <li className="nav-item">
                   <Link to="/ChangePassword" className="nav-link" style={isActive('/ChangePassword')}>
                       Change Password
                   </Link>
               </li>
               </Fragment>
            )}
            {isAuth() && isAuth().role === 'admin' && (
                 <Fragment>
                <li className="nav-item">
                <Link to="/AddProduct" className="nav-link" style={isActive('/AddProduct')}>
                       Add Product
                   </Link>
                </li>
                </Fragment>
            )}
        </ul>
    );

    return (
        <Fragment>
            {nav()}
            <div className="container-fluid">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);