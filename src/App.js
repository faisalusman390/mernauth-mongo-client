import React,{useState,useEffect} from 'react'
import Layout from './components/Layouts/Layout';
import { toast } from 'react-toastify';
import { getPost } from '././services/API';
const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

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
  return (
    <Layout>
      <div className="col-md-6 offset-md-3 text-center">
                <h1 className="p-5">Products</h1>
                {/* <h2>Products</h2> */}
                {/* <hr /> */}
                {/* <p className="lead">
                    MERN stack login register system with account activation, forgot password, reset password, user and users
                    with the role of admin.
                </p> */}

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
            </div>
    </Layout>
  )
}

export default App;
