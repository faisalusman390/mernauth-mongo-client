import React, {useEffect,useState} from 'react'
import axios from "axios";

export const AuthContext = React.createContext();
export const AuthProvider = ({children}) => {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);

   useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(res.data);
        setLoading(false);

    }
    fetchPosts();
  },[]);
//   console.log(posts)
    return (
        <AuthContext.Provider
        value={{
            posts,loading
        }}>
            {children}
        </AuthContext.Provider>
            
        
    )
}

