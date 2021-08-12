import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { changepassword} from '../../../services/API'
import { isAuth,getCookie } from '../../../helpers/helpers';
import 'react-toastify/dist/ReactToastify.min.css';

const ChangePassword = ({ match }) => {
    // props.match from react router dom
    const [name, setname]= useState(isAuth().name);
    const [ oldpassword, setoldPassword] = useState('');
    const [ newpassword, setnewPassword] = useState('');
    const [ cnfpassword, setcnfPassword] = useState('');
    const [ buttonText, setButtonText] = useState('Reset Password');
    const [ token, setToken] = useState(getCookie('token'));
    const [ user_id, setUserId] = useState('');
    

    useEffect(() => {
        const _id = isAuth()._id;
        setUserId(_id);
    }, []);

    const handleOld = (e) => {
        setoldPassword(e.target.value);
       
      };
     
    const handleNew = (e) => {
        setnewPassword(e.target.value);
       
      };
      const handleCnf = (e) => {
        setcnfPassword(e.target.value);
       
      };
      const checkPassword = () => {

        if (oldpassword === '')
        toast.error('old password field is empty');
        if (newpassword === '')
        toast.error('new password field is empty');
              
        else if (cnfpassword === '')
        toast.error('confirm password field is empty');
              
        else if (newpassword !== cnfpassword) {
            toast.error('new and confirm password did not match');
            return false;
        }

        else{
            return true;
        }
    }
      
    const clickSubmit = event => {
        event.preventDefault();
        
        if(checkPassword()) {
            setButtonText("Submitting")
            changepassword(newpassword,token,user_id,oldpassword).then(response => {
                console.log('RESET PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setButtonText("Done")
            })
            .catch(error => {
                console.log('RESET PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setButtonText("Reset Password")
            });
        }
        
    };

    const passwordResetForm = () => (
        <form>
            <div className="form-group">
                {/* <label className="text-muted">old password</label> */}
                <input
                    onChange={handleOld}
                    value={oldpassword}
                    type="password"
                    className="form-control"
                    placeholder="Old password"
                    required
                />
            </div>
            <div className="form-group">
                {/* <label className="text-muted">new password</label> */}
                <input
                    onChange={handleNew}
                    value={newpassword}
                    type="password"
                    className="form-control"
                    placeholder="Type new password"
                    required
                />
            </div>
            <div className="form-group">
                {/* <label className="text-muted">confirm new password</label> */}
                <input
                    onChange={handleCnf}
                    value={cnfpassword}
                    type="password"
                    className="form-control"
                    placeholder="Type confirm new password"
                    required
                />
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
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>
                {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default ChangePassword;