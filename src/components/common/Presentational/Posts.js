import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import { getUser, getPost } from '../../../services/API'

export default function Posts() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
        setLoading(true);
        getUser().then(res => {
            console.log(res.data)
            const { users } = res.data;
            setUsers(users);
            setLoading(false);
        })
        .catch( error => {
            toast.error(error);
        })
        
        }
        fetchUsers();
    },[])
    useEffect(() => {
        const fetchPosts = async () => {
        setLoading(true);
        getPost().then(res => {
            console.log(res.data)
            const { posts } = res.data;
            setPosts(posts);
            setLoading(false);
        })
        .catch( error => {
            toast.error(error);
        })
        
        }
        fetchPosts();
    },[])
    //  console.log(users)  
    return (
        // const { users }= users;
        <div>
           {
               posts?.length !== 0 ? (
                   <ul className="list-group mb-4">
                 {posts?.map(post => (
                     <li key={post._id} className="list-group-item">
                         {post.title}
                     </li>
                 ))}
               </ul>):(null)
               
           } 
        </div>
          
        
    )
}
