import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../../Layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth, validateSubscription, checkValidEmail, checkValidPassword } from '../../../helpers/helpers';
import { signUp } from '../../../services/API'
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: 'Faisal Usman',
        email: 'faisalusman390@gmail.com',
        password: '1234567',
        buttonText: 'Submit'
    });
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [ name, setName] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Submit');

    // const { name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (checkValidEmail(email)) {
          setEmailErrorMsg('');
        }
      };
      const handlePassword = (e) => {
        setPassword(e.target.value);
        if (checkValidPassword(password)) {
          setPasswordError('');
        }
      };
      const handleName = (e) => {
        setName(e.target.value);
       
      };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        const msg = validateSubscription(email,password);
        console.log(msg.pass_msg);
        if (msg.email_msg === 'EMAIL_MANDATORY') {
            setEmailErrorMsg('Email mandatory');
            return;
          } if (msg.email_msg === 'INVALID_EMAIL') {
            setEmailErrorMsg('Invalid Email');
          } 
          if(msg.pass_msg === "INVALID_PASSWORD") {
              setPasswordError('Invalid Password')
          }
          if (msg.email_msg === '' && msg.pass_msg === '') {
            signUp(name,email,password).then(response => {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values,setPasswordError:'',name: '', email: '', password: '', buttonText: 'Submitted' });
                setEmailErrorMsg('')
                setPasswordError('')
                toast.success(response.data.message);
            })
            .catch(error => {
                if(error && error.response && error.response.status === 400) {
                    setValues({ ...values, buttonText: 'Submit' });
                    toast.error('Email is already taken');
                } else if(error && error.response) {
                    setValues({ ...values, buttonText: 'Submit' });
                    toast.error(error.response.data.error);
                }

            });
          }
           
    };

    const signupForm = () => (
        <form>
            <div className="form-group">
                <lable className="text-muted">Name</lable>
                <input onChange={handleName} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <lable className="text-muted">Email</lable>
                <input onChange={handleEmail} value={email} type="email" className="form-control" />
                <div className="form-text" style={{color:'red'}}><p>{emailErrorMsg}</p></div>
            </div>

            <div className="form-group">
                <lable className="text-muted">Password</lable>
                <input onChange={handlePassword} value={password} type="password" className="form-control" />
                <div className="form-text" style={{color:'red'}}><p>{passwordError}</p></div>
            </div>

            <div>
                <button disabled={email && name && password ? false : true} className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="p-5 text-center">Signup</h1>
                {signupForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    );
};

export default Signup;