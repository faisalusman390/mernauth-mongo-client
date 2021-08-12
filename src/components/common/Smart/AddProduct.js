import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { changepassword, addproduct, updateproduct, deleteproduct} from '../../../services/API'
import { isAuth,getCookie } from '../../../helpers/helpers';
import { getPost } from '../../../services/API';
import 'react-toastify/dist/ReactToastify.min.css';
import { set } from 'js-cookie';

const AddProduct = ({ match }) => {
    // props.match from react router dom
    const [ title, setTitle] = useState('');
    const [ edittitle, setEditTitle] = useState('');
    const [ description, setDescription] = useState('');
    const [ buttonText, setButtonText] = useState('Add Product');
    const [ user_id, setUserId] = useState('')
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);
    const [show, setShow] = useState(false);
    const [ product_title, setProduct_Title] = useState('');
    const [ productid, setProduct_Id] = useState('');



    const fetchPosts = async () => {
        // setLoading(true);
        getPost().then(res => {
            console.log(res.data)
            const { posts } = res.data;
            setPosts(posts);
            // setLoading(false);
        })
        .catch( error => {
            toast.error(error);
        })
        
        }
    
    useEffect(() => {
        const _id = isAuth()._id;
        setUserId(_id);
        fetchPosts();
      },[]);

    const handleTitle = (e) => {
        setTitle(e.target.value);
       
      };
     
    const handleDesc = (e) => {
        setDescription(e.target.value);
       
      };
      const handleEdit = (e) => {
        setEditTitle(e.target.value);
       
      };
   
      const checkProduct = () => {

        if (title === '')
        toast.error('title field is empty');
        if (description === '')
        toast.error('description field is empty');
        else{
            return true;
        }
    }
      
    const clickSubmit = event => {
        event.preventDefault();
        if (title) {
            console.log("title and id",title,user_id)
            if(checkProduct()) {
                setButtonText("Adding")
                addproduct(title,description,user_id).then(response => {
                    // console.log('RESET PASSWORD SUCCESS', response);
                    toast.success(response.data.message);
                    setTitle('')
                    setDescription('')
                    setButtonText("Done")
                    fetchPosts()
                })
                .catch(error => {
                    // console.log('RESET PASSWORD ERROR', error.response.data);
                    toast.error(error.response.data.error);
                    setButtonText("Try again")
                });
            }
        }
        else if (edittitle) {
            updateproduct(productid,edittitle).then(response => {
                // console.log('RESET PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setTitle('')
                setDescription('')
                setButtonText("Add Product")
                fetchPosts()
                // window.location.reload();
            })
            .catch(error => {
                // console.log('RESET PASSWORD ERROR', error.response.data);
                // toast.error(error.response.data.error);
                setButtonText("Try again")
            });
        }
       
        
    };
    const clickEdit = (id,post_title) => {
        setShow(true)
        setEditTitle(post_title)
        setButtonText('Update')
        setProduct_Id(id)
        fetchPosts()
        // event.preventDefault();
        console.log(id)
            // setButtonText("updating") 
    };
    const clickDelete = (id) => {
        deleteproduct(id).then(response => {
            // console.log('RESET PASSWORD SUCCESS', response);
            toast.success(response.data.message);
            fetchPosts()
        })
        .catch(error => {
            // console.log('RESET PASSWORD ERROR', error.response.data);
            toast.error(error.response.data.error);
            // setButtonText("Try again")
        });
    };
    const CloseInput = () => {
        setShow(false)
        console.log("close input clicked")
    }

    const addProductForm = () => (
        <form>
            <div className="form-group">
                {/* <label className="text-muted">old password</label> */}
                <input
                    onChange={handleTitle}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Product title"
                    style={{width:'90%'}}
                    required
                />
            </div>
            {
                    show ? (<div className="form-group d-flex">
                    {/* <label className="text-muted">new password</label> */}
                    
                    <input
                        onChange={handleEdit}
                        value={edittitle}
                        type="text"
                        className="form-control"
                        placeholder="Edit Product title"
                        style={{width:'90%'}}
                        required
                    />
                    <a className=" d-flex justify-content-center align-items-center ml-2" onClick={(event) => { CloseInput(1) }} aria-label="Close">&#10006;</a>
                </div>):''
            }
            
            <div className="form-group d-flex">
                {/* <label className="text-muted">new password</label> */}
                <input
                    onChange={handleDesc}
                    value={description}
                    type="text"
                    className="form-control"
                    placeholder="Product discription"
                    style={{width:'90%'}}
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
                <h1 className="p-5 text-center">Hey Admin, Add a new product</h1>
                {addProductForm()}
            </div>
            <div className="mt-5">
                {
                    posts?.length !== 0 ? (
                        <ul className="list-group mb-4">
                      {posts?.map(post => (
                          <li key={post._id} className="list-group-item d-flex justify-content-between">
                              {post.title}
                              <div>
                              
                              <button className="btn btn-primary pl-5 pr-5 mr-3" onClick={(event) => { clickEdit(post._id,post.title) }}>
                               Edit
                              </button> 
                             
                             
                             <button className="btn btn-danger pl-5 pr-5" onClick={(event) => { clickDelete(post._id) }}>
                              Delete
                             </button>
                            
                              </div>
                              
                          </li>
                          
                      ))}
                    </ul>):(null)
                    
                } 
             </div>
        </Layout>
    );
};

export default AddProduct;