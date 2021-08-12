import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { changepassword, addproduct, updateproduct, deleteproduct} from '../../../services/API'
import { isAuth,getCookie } from '../../../helpers/helpers';
import { getPost } from '../../../services/API';
import 'react-toastify/dist/ReactToastify.min.css';
import { set } from 'js-cookie';
import Sidebar from '../Presentational/sidebar';
import { withRouter,Link, useLocation } from 'react-router-dom'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const Venues = (props) => {
    // console.log(props.location.state.detail)
    // props.match from react router dom
    const location = useLocation()
    const [ title, setTitle] = useState('');
    const [ edittitle, setEditTitle] = useState('');
    const [ description, setDescription] = useState('');
    const [ buttonText, setButtonText] = useState('Add Venue');
    const [ user_id, setUserId] = useState('')
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);
    const [show, setShow] = useState(false);
    const [ product_title, setProduct_Title] = useState('');
    const [ productid, setProduct_Id] = useState('');
    const [companyname, setCompanyName] = useState('')
    const [address,setAddress] = useState('')
 

    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search); // result: '?query=abc'
        console.log(location.state.detail); // result: 'some_value'
        setCompanyName(location.state.detail)
     }, [location]);
 


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
    const handleChange = address => {
        setAddress(address);
      };
     
     const handleSelect = address => {
         setAddress(address)
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
      };
    const addProductForm = () => (
        <form>
            <div className="form-group">
                {/* <label className="text-muted">old password</label> */}
                {/* <input
                    onChange={handleTitle}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Veneue Name"
                    style={{width:'90%'}}
                    required
                /> */}
                <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            //   onChange={handleTitle}
              value={address}
              type="text"
              className="form-control"
              placeholder="Veneue Name"
              style={{width:'90%'}}
              required
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
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
            
            {/* <div className="form-group d-flex">
                <input
                    onChange={handleDesc}
                    value={description}
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                    style={{width:'90%'}}
                    required
                />
            </div> */}
           


            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <Sidebar />
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Add a new Venues for {companyname}</h1>
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

export default Venues;



////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { changepassword, addproduct, updateproduct, deleteproduct} from '../../../services/API'
import { isAuth,getCookie } from '../../../helpers/helpers';
import { getPost } from '../../../services/API';
import 'react-toastify/dist/ReactToastify.min.css';
import { set } from 'js-cookie';
import Sidebar from '../Presentational/sidebar';
import { withRouter,Link, useLocation } from 'react-router-dom'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const Venues = (props) => {
    // console.log(props.location.state.detail)
    // props.match from react router dom
    const location = useLocation()
    const [ title, setTitle] = useState('');
    const [ edittitle, setEditTitle] = useState('');
    const [ description, setDescription] = useState('');
    const [ buttonText, setButtonText] = useState('Add Venue');
    const [ user_id, setUserId] = useState('')
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);
    const [show, setShow] = useState(false);
    const [ product_title, setProduct_Title] = useState('');
    const [ productid, setProduct_Id] = useState('');
    const [companyname, setCompanyName] = useState('')
    const [address,setAddress] = useState('')
 

    useEffect(() => {
        
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search); // result: '?query=abc'
        console.log(location.state.detail); // result: 'some_value'
        setCompanyName(location.state.detail)
     }, [location]);
 


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
        // initialize()
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
    const handleChange = address => {
        setAddress(address);
      };
     
     const handleSelect = address => {
         setAddress(address)
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              console.log('Success', latLng)
            //   codeLatLng(latLng.lat,latLng.lng)
            })
          .catch(error => console.error('Error', error));
      };
      
    //   const searchOptions = {
    //     location: new google.maps.LatLng(-34, 151),
    //     radius: 2000,
    //     types: ['address']
    //   }
    // var geocoder;
    // const initialize = () => {
    //     geocoder = new google.maps.Geocoder();
    //   }
    // function codeLatLng(lat, lng) {

    //     var latlng = new google.maps.LatLng(lat, lng);
    //     geocoder.geocode({'latLng': latlng}, function(results, status) {
    //       if (status == google.maps.GeocoderStatus.OK) {
    //       //console.log(results);
    //         if (results[1]) {
    //         var indice=0;
    //         for (var j=0; j<results.length; j++)
    //         {
    //             if (results[j].types[0]=='locality')
    //                 {
    //                     indice=j;
    //                     break;
    //                 }
    //             }
    //         alert('The good number is: '+j);
    //         console.log(results[j]);
    //         for (var i=0; i<results[j].address_components.length; i++)
    //             {
    //                 if (results[j].address_components[i].types[0] === "locality") {
    //                         //this is the object you are looking for City
    //                        var city = results[j].address_components[i];
    //                     }
    //                 if (results[j].address_components[i].types[0] === "administrative_area_level_1") {
    //                         //this is the object you are looking for State
    //                        var region = results[j].address_components[i];
    //                     }
    //                 if (results[j].address_components[i].types[0] === "country") {
    //                         //this is the object you are looking for
    //                        var country = results[j].address_components[i];
    //                     }
    //             }
    
    //             //city data
    //             alert(city.long_name + " || " + region.long_name + " || " + country.short_name)
    
    
    //             } else {
    //               alert("No results found");
    //             }
    //         //}
    //       } else {
    //         alert("Geocoder failed due to: " + status);
    //       }
    //     });
    //   }
    const addProductForm = () => (
        <form>
            <div className="form-group">
                {/* <label className="text-muted">old password</label> */}
                {/* <input
                    onChange={handleTitle}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Veneue Name"
                    style={{width:'90%'}}
                    required
                /> */}
                <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        // searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Venues ...',
                className: 'location-search-input',
              })}
            //   onChange={handleTitle}
              value={address}
              type="text"
              className="form-control"
              placeholder="Veneue Name"
              style={{width:'90%'}}
              required
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
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
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );
 console.log("address is",address)
    return (
        <Layout>
            <Sidebar />
        
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Add a new Venues for {companyname}</h1>
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

export default Venues;