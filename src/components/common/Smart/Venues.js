/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { addvenue,getVenues,updatevenue, deletevenue} from '../../../services/API'
import { isAuth,getCookie } from '../../../helpers/helpers';
import 'react-toastify/dist/ReactToastify.min.css';
import Sidebar from '../Presentational/sidebar';
import { useLocation } from 'react-router-dom'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
const Venues = (props) => {
    const { history } = props;
    const location = useLocation()
    const [ title, setTitle] = useState('');
    const [ description, setDescription] = useState('');
    const [ buttonText, setButtonText] = useState('Add Venue');
    const [ user_id, setUserId] = useState('')
    const [show, setShow] = useState(false);
    const [ venueid, setVenue_Id] = useState('');
    const [companyname, setCompanyName] = useState('')
    const [address,setAddress] = useState('')
    const [editaddress,setEditAddress] = useState('')
    const [city,setCity] = useState('')
    const [editcity,setEditCity] = useState('')
    const [state,setState] = useState('')
    const [country,setCountry] = useState('')
    const [company_id,setCompanyId] = useState(location.state.company_id)
    const [company_id_one,setCompanyIdOne] = useState(location.state.company_id)
    const [venues, setVenues] = useState([]);


    const fetchVenues = async (user_token) => {
        getVenues(user_token, company_id_one).then(res => {
            const { venues } = res.data;
            setVenues(venues);
        })
        .catch( error => {
            toast.error(error);
        })
        
        }
    useEffect(() => {
        setCompanyName(location.state.detail)
        setCompanyId(location.state.company_id)
        setCompanyIdOne(location.state.company_id)
        fetchVenues(getCookie('token'));
        
      },[location]);

    useEffect(() => {
        const _id = isAuth()._id;
        setUserId(_id);
      },[]);
      const checkProduct = () => {

        if (city === '')
        toast.error('city field is empty');
        if (state === '')
        toast.error('state field is empty');
        if (country === '')
        toast.error('country field is empty');
        else{
            return true;
        }
    }
      
    const clickSubmit = event => {
        event.preventDefault();
        if (show !== true) {
            if(checkProduct()) {
                setButtonText("Adding")
                addvenue(city,state,country,company_id,getCookie('token')).then(response => {
                    toast.success(response.data.message);
                    setCity('')
                    setState('')
                    setCountry('')
                    setTitle('')
                    setDescription('')
                    setAddress('')
                    setButtonText("Add Venue")
                    fetchVenues(getCookie('token'));
                })
                .catch(error => {
                    toast.error(error.response.data.error);
                    setButtonText("Try again")
                });
            }
        }
        else {
            updatevenue(venueid,editcity).then(response => {
                toast.success(response.data.message);
                setTitle('')
                setDescription('')
                setButtonText("Add Venue")
                setShow(false)
                fetchVenues(getCookie('token'));
            })
            .catch(error => {
                setButtonText("Try again")
            });
        }
       
        
    };
    const clickEdit = (id,venue_name) => {
        setShow(true)
        setEditAddress(venue_name)
        setButtonText('Update')
        setVenue_Id(id)
    };
    const clickDelete = (id) => {
        deletevenue(id).then(response => {
            toast.success(response.data.message);
            fetchVenues(getCookie('token'));
        })
        .catch(error => {
            toast.error(error.response.data.error);
        });
    };
    const CloseInput = () => {
        setShow(false)
    }
    const handleChange = address => {
        setAddress(address);
      };
     
     const handleSelect = address => {
         setAddress(address)
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              codeLatLng(latLng.lat,latLng.lng)
            })
          .catch(error => console.error('Error', error));
      };
      const handleEditChange = address => {
        setEditAddress(address);
      };
     
    //  const handleEditSelect = address => {
    //      setEditAddress(address)
    //     geocodeByAddress(address)
    //       .then(results => getLatLng(results[0]))
    //       .then(latLng => {
    //           codeLatLng(latLng.lat,latLng.lng)
    //         })
    //       .catch(error => console.error('Error', error));
    //   };
    var findResult = function(results, name){
        var result =  results.find(function(obj){
            return obj.types[0] === name && obj.types[1] === "political";
        });
        return result ? result.long_name : null;
    };

    function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK && results.length) {
                results = results && results.length>0 ? results[0].address_components:null;
                var city = findResult(results, "locality");
                var state = findResult(results, "administrative_area_level_1");
                var country = findResult(results, "country");
                if( show === true){
                    setEditCity(city)
                }
                setCity(city)
                setState(state)
                setCountry(country)
            }
        },(error)=>{
            console.error(error)
        });
      }
    const addProductForm = () => (
        <form>
            <div className="form-group">
               
                <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Venues ...',
                className: 'location-search-input',
              })}
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
                    <PlacesAutocomplete
        value={editaddress}
        onChange={handleEditChange}
        onSelect={handleEditSelect}
        
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{width:'90%'}}>
            <input
              {...getInputProps({
                placeholder: 'Search Venues ...',
                className: 'location-search-input',
                
              })}
              value={editaddress}
              type="text"
              className="form-control"
              placeholder="Edit Veneue Name"
              required
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
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
    return (
        <Layout>
            <Sidebar />
        
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Add a new Venues for {companyname}</h1>
                {addProductForm()}
            </div>
            <div className="mt-5 col-md-6 offset-md-3">
                {
                    venues?.length !== 0 ? (
                        <ul className="list-group mb-4">
                      {venues?.map(venue => (
                          <li key={venue._id} className="list-group-item d-flex justify-content-between">
                              {venue.city}
                              <div>
                              
                              <button className="btn btn-primary pl-5 pr-5 mr-3" onClick={(event) => { clickEdit(venue._id,venue.city) }}>
                               Edit
                              </button> 
                             
                             
                             <button className="btn btn-danger pl-5 pr-5" onClick={(event) => { clickDelete(venue._id) }}>
                              Delete
                             </button>
                             <button className="btn btn-info pl-5 pr-5 ml-3" onClick={(event) => {  history.push({
                                pathname: '/events',
                                search: '?query=abc',
                                state: { venue_city: venue.city ,company_id : venue.company_id,venue_id :venue._id}
                                }); }}>
                              Show Events
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