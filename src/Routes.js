import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './components/common/Smart/Signup';
import Signin from './components/common/Smart/Signin';
import Private from './components/common/Presentational/Private';
import PrivateRoute from './components/common/Smart/PrivateRoute';
import Admin from './components/common/Presentational/Admin';
import AdminRoute from './components/common/Smart/AdminRoute';
import ChangePassword from './components/common/Smart/ChangePassword';
import Forgot from './components/common/Smart/Forgot';
import Reset from './components/common/Smart/Reset';
import { AuthProvider } from './context/apiContext';
import Profile from './components/common/Presentational/Profile'
import AddProduct from './components/common/Smart/AddProduct'
import ResetToken from './components/common/Presentational/ResetToken'
import Companies from './components/common/Smart/Companies';
import Events from './components/common/Smart/Events';
import Venues from './components/common/Smart/Venues';

const Routes = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/changepassword" exact component={ChangePassword} />
                <PrivateRoute path="/private" exact component={Private} />
                <AdminRoute path="/admin" exact component={Admin} />
                <Route path ="/auth/password/forgot" exact component={Forgot}/>
                <Route path="/auth/password/reset/:token" exact component={Reset}/>
                <Route path="/profile" exact component={Profile} />
                <Route path="/resettoken" exact component={ResetToken} />
                <Route path="/addproduct" exact component={AddProduct} />
                <Route path="/companies" exact component={Companies} />
                <Route path="/venues" exact component={Venues} />
                <Route path="/events" exact component={Events} />
                
            </Switch>
        </BrowserRouter>
        </AuthProvider>
    );
};

export default Routes;