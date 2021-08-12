import React, { useEffect, useState } from 'react';
import Layout from '../../Layouts/Layout';
import { isAuth, getCookie, signout } from '../../../helpers/helpers';
import { getUser, getPost, finduser } from '../../../services/API'
import { toast } from 'react-toastify';

const Private = ({ history }) => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const _id = isAuth()._id;
        const user_cookie = getCookie('token');
        finduser(_id,user_cookie).then(respones => {
            //console.log("findme respones", respones)

        }).catch(error => {
            console.log("findme error",error)
            signout(() => {
                history.push('/');
            });
            // history.push('/signin');
        })
        
      });
      useEffect(() => {
        const fetchUsers = async () => {
        // setLoading(true);
        getUser().then(res => {
            console.log(res.data)
            const { users } = res.data;
            setUsers(users);
            // setLoading(false);
        })
        .catch( error => {
            toast.error(error);
        })
        
        }
        fetchUsers();
    },[])
    console.log(users)
    useEffect(() => {
        const fetchPosts = async () => {
        // setLoading(true);
        getPost().then(res => {
            console.log(res.data)
            const { posts } = res.data;
            let user = isAuth();
            if(user.role !== 'admin') {
                let anonymous = posts.filter((post) =>{
                    return post.user === user._id
                })
                setPosts(anonymous)
            } else {
                setPosts(posts);
            }
            // setLoading(false);
        })
        .catch( error => {
            toast.error(error);
        })
        
        }

        fetchPosts();
    },[])
   console.log("posts array",posts);
    return (
    <Layout>
        <div className='container mt-5'>
        <h1 className="text-primary mb-3">My Blog</h1>
{
           <ul className="list-group mb-4">  
               {posts.map(post => (
              <li key={post._id} className="list-group-item">
                {post.title}
             </li>
      ))}
      </ul>  
      }
        </div>   
    </Layout>
      )
    };

export default Private;