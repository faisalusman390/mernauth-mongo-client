import React, { useEffect} from 'react';
import Layout from '../../Layouts/Layout';
import { isAuth, getCookie, signout } from '../../../helpers/helpers';
import { finduser } from '../../../services/API'
import Posts from './Posts';

const Admin = ({history}) => {
   
  useEffect(() => {
    const _id = isAuth()._id;
    const user_cookie = getCookie('token');
    finduser(_id,user_cookie).then(respones => {
        console.log("findme respones", respones)

    }).catch(error => {
        console.log("findme error",error)
        signout(() => {
            history.push('/');
        });
    })
    
  });
    return (
    <Layout>
        <div className='container mt-5'>
            <h1 className="text-primary mb-3">My Blog</h1>
            <Posts/>

        </div>
    </Layout>
    )
    
}

export default Admin;
