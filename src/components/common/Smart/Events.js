// import React, { useState, useEffect } from 'react';
// import Layout from '../../Layouts/Layout';
// import { ToastContainer, toast } from 'react-toastify';
// import { addproduct, updateproduct, deleteproduct,addevent} from '../../../services/API'
// import { isAuth,getCookie } from '../../../helpers/helpers';
// import { getPost } from '../../../services/API';
// import 'react-toastify/dist/ReactToastify.min.css';
// import Sidebar from '../Presentational/sidebar';
// import { useLocation,withRouter } from 'react-router-dom'

// const Events = (props,{ match,history }) => {
//     const location = useLocation()
//     const [ title, setTitle] = useState('');
//     const [ edittitle, setEditTitle] = useState('');
//     const [ description, setDescription] = useState('');
//     const [ buttonText, setButtonText] = useState('Add Event');
//     const [ user_id, setUserId] = useState('')
//     const [posts, setPosts] = useState([]);
//     const [show, setShow] = useState(false);
//     const [ productid, setProduct_Id] = useState('');
//     const [company_id,setCompanyId] = useState('')
//     const [venue_id, setVenueId] = useState('')
//     const [venue_name, setVenueName] = useState('')
//     const [eventname,setNameEvent] =  useState('')
//     const [eventcategory,setEventCategory] = useState('')
//     const [eventtickets,setEventTickets] = useState('')
//     const [eventdis,setEventDis] = useState('')



//     // const fetchPosts = async () => {
//     //     getPost().then(res => {
//     //         console.log(res.data)
//     //         const { posts } = res.data;
//     //         setPosts(posts);
//     //     })
//     //     .catch( error => {
//     //         toast.error(error);
//     //     })
        
//     //     }
    
//     useEffect(() => {
//         const _id = isAuth()._id;
//         setUserId(_id);
//         // fetchPosts();
//       },[]);

//       useEffect(() => {
//         setCompanyId(location.state.company_id)
//         setVenueId(location.state.venue_id)
//         setVenueName(location.state.venue_city)
        
//       },[location]);
    
     
//     const handleEventName = (e) => {
//         setNameEvent(e.target.value);
       
//       };
//       const handleEventCat = (e) => {
//         setEventCategory(e.target.value);
       
//       };
//       const handleEventTick = (e) => {
//         setEventTickets(e.target.value);
       
//       };
//       const handleDesc = (e) => {
//         setEventDis(e.target.value);
       
//       };
//       const handleEdit = (e) => {
//         setEditTitle(e.target.value);
       
//       };
   
//       const checkProduct = () => {

//         if (eventname === '')
//         toast.error('title field is empty');
//         if (eventcategory === '')
//         toast.error('category field is empty');
//         if (eventtickets === '')
//         toast.error('tickets field is empty');
//         if (eventdis === '')
//         toast.error('description field is empty');
//         else{
//             return true;
//         }
//     }
      
//     const clickSubmit = event => {
//         event.preventDefault();
//         if (eventname) {
//             if(checkProduct()) {
//                 setButtonText("Adding")
//                 addevent(eventname,eventcategory,eventtickets,eventdis,venue_id,company_id).then(response => {
//                     toast.success(response.data.message);
//                     setTitle('')
//                     setDescription('')
//                     setButtonText("Done")
//                     // fetchPosts()
//                 })
//                 .catch(error => {
//                     toast.error(error.response.data.error);
//                     setButtonText("Try again")
//                 });
//             }
//         }
//         else if (edittitle) {
//             updateproduct(productid,edittitle).then(response => {
//                 toast.success(response.data.message);
//                 setTitle('')
//                 setDescription('')
//                 setButtonText("Add Product")
//                 // fetchPosts()
//             })
//             .catch(error => {
//                 setButtonText("Try again")
//             });
//         }
       
        
//     };
//     const clickEdit = (id,post_title) => {
//         setShow(true)
//         setEditTitle(post_title)
//         setButtonText('Update')
//         setProduct_Id(id)
//         // fetchPosts()
//     };
//     const clickDelete = (id) => {
//         deleteproduct(id).then(response => {
//             toast.success(response.data.message);
//             // fetchPosts()
//         })
//         .catch(error => {
//             toast.error(error.response.data.error);
//         });
//     };
//     const CloseInput = () => {
//         setShow(false)
//     }

//     const addProductForm = () => (
//         <form>
//             <div className="form-group">
//                 <input
//                     onChange={handleEventName}
//                     value={eventname}
//                     type="text"
//                     className="form-control"
//                     placeholder="Event name"
//                     style={{width:'90%'}}
//                     required
//                 />
//             </div>
//             <div className="form-group">
//                 <input
//                     onChange={handleEventCat}
//                     value={eventcategory}
//                     type="text"
//                     className="form-control"
//                     placeholder="Event category"
//                     style={{width:'90%'}}
//                     required
//                 />
//             </div>
//             <div className="form-group">
//                 <input
//                     onChange={handleEventTick}
//                     value={eventtickets}
//                     type="text"
//                     className="form-control"
//                     placeholder="Event tickets"
//                     style={{width:'90%'}}
//                     required
//                 />
//             </div>
//             {
//                     show ? (<div className="form-group d-flex">
                    
//                     <input
//                         onChange={handleEdit}
//                         value={edittitle}
//                         type="text"
//                         className="form-control"
//                         placeholder="Edit Product title"
//                         style={{width:'90%'}}
//                         required
//                     />
//                     <a className=" d-flex justify-content-center align-items-center ml-2" onClick={(event) => { CloseInput(1) }} aria-label="Close">&#10006;</a>
//                 </div>):''
//             }
            
//             <div className="form-group d-flex">
//                 <input
//                     onChange={handleDesc}
//                     value={eventdis}
//                     type="text"
//                     className="form-control"
//                     placeholder="Event discription"
//                     style={{width:'90%'}}
//                     required
//                 />
//             </div>
           


//             <div>
//                 <button className="btn btn-primary" onClick={clickSubmit}>
//                     {buttonText}
//                 </button>
//             </div>
//         </form>
//     );
//     console.log("venue_name is",venue_name);
//     return (
//         <Layout>
//             <Sidebar />
//             <div className="col-md-6 offset-md-3">
//                 <ToastContainer />
//                 <h1 className="p-5 text-center">Hey Admin, Add a new Event for {venue_name}</h1>
//                 {addProductForm()}
//             </div>
//             <div className="mt-5">
//                 {
//                     posts?.length !== 0 ? (
//                         <ul className="list-group mb-4">
//                       {posts?.map(post => (
//                           <li key={post._id} className="list-group-item d-flex justify-content-between">
//                               {post.title}
//                               <div>
                              
//                               <button className="btn btn-primary pl-5 pr-5 mr-3" onClick={(event) => { clickEdit(post._id,post.title) }}>
//                                Edit
//                               </button> 
                             
                             
//                              <button className="btn btn-danger pl-5 pr-5" onClick={(event) => { clickDelete(post._id) }}>
//                               Delete
//                              </button>
                            
//                               </div>
                              
//                           </li>
                          
//                       ))}
//                     </ul>):(null)
                    
//                 } 
//              </div>
//         </Layout>
//     );
// };

// export default withRouter(Events);