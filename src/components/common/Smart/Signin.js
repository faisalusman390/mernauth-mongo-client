import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../../Layouts/Layout';
import { authenticate, isAuth, validateSubscription } from '../../../helpers/helpers';
import { ToastContainer, toast } from 'react-toastify';
import { signIn } from '../../../services/API'
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: 'faisalusman390@gmail.com',
        password: '1234567',
        buttonText: 'Submit'
    });
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value); 
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        const msg = validateSubscription(email);

        if (msg.email_msg === 'EMAIL_MANDATORY') {
            setEmailErrorMsg('Email mandatory');
            return;
          } if (msg.email_msg === 'INVALID_EMAIL') {
            setEmailErrorMsg('Invalid Email');
          } 
       
           signIn(email,password).then(response => {
                console.log('SIGNIN SUCCESS', response);
                // save the response (user, token) localstorage/cookie
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    // isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
                    history.push('/profile')
                });
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signinForm = () => (
        <form>
            <div className="form-group">
                <lable className="text-muted">Email</lable>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
                {/* <div className="form-text" style={{color:'red'}}><p>{emailErrorMsg}</p></div> */}
            </div>

            <div className="form-group">
                <lable className="text-muted">Password</lable>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-4 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="p-5 text-center">Signin</h1>
                {signinForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    );
};

export default Signin;