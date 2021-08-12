import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { addcompany,getCompanies,updatecompany,deletecompany} from '../../../services/API'
import { getCookie } from '../../../helpers/helpers';
import 'react-toastify/dist/ReactToastify.min.css';
import Sidebar from '../Presentational/sidebar';

const Companies = ({ match,history }) => {
    // props.match from react router dom
    const [ title, setTitle] = useState('');
    const [ edittitle, setEditTitle] = useState('');
    const [ description, setDescription] = useState('');
    const [ buttonText, setButtonText] = useState('Add Company');
    const [show, setShow] = useState(false);
    const [ productid, setProduct_Id] = useState('');
    const [ user_id, setUserId] = useState('');
    const [companies, setCompanies] = useState([]);



        const fetchCompanies = async (user_token) => {
            // setLoading(true);
            getCompanies(user_token).then(res => {
                const { companies } = res.data;
                setCompanies(companies);
                // setLoading(false);
            })
            .catch( error => {
                toast.error(error);
            })
            
            }
        useEffect(() => {
            fetchCompanies(getCookie('token'));
            
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
            if(checkProduct()) {
                setButtonText("Adding")
                addcompany(title,description,getCookie('token')).then(response => {
                    toast.success(response.data.message);
                    setTitle('')
                    setDescription('')
                    setButtonText("Done")
                    fetchCompanies(getCookie('token'))
                })
                .catch(error => {
                    toast.error(error.response.data.error);
                    setButtonText("Try again")
                });
            }
        }
        else if (edittitle) {
            updatecompany(productid,edittitle).then(response => {
                toast.success(response.data.message);
                setTitle('')
                setDescription('')
                setButtonText("Add Product")
                fetchCompanies(getCookie('token'))
                // window.location.reload();
            })
            .catch(error => {
                setButtonText("Try again")
            });
        }
       
        
    };
    const clickEdit = (id,post_title) => {
        setShow(true)
        setEditTitle(post_title)
        setButtonText('Update')
        setProduct_Id(id)
    };
    const clickDelete = (id) => {
        deletecompany(id).then(response => {
            toast.success(response.data.message);
            fetchCompanies(getCookie('token'))
        })
        .catch(error => {
            toast.error(error.response.data.error);
        });
    };
    
    const CloseInput = () => {
        setShow(false)
    }

    const addCompanyForm = () => (
        <form>
            <div className="form-group">
                <input
                    onChange={handleTitle}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Company name"
                    style={{width:'90%'}}
                    required
                />
            </div>
            {
                    show ? (<div className="form-group d-flex">
                    
                    <input
                        onChange={handleEdit}
                        value={edittitle}
                        type="text"
                        className="form-control"
                        placeholder="Edit Company Name"
                        style={{width:'90%'}}
                        required
                    />
                    <a className=" d-flex justify-content-center align-items-center ml-2" onClick={(event) => { CloseInput(1) }} aria-label="Close">&#10006;</a>
                </div>):''
            }
            
            <div className="form-group d-flex">
                <input
                    onChange={handleDesc}
                    value={description}
                    type="text"
                    className="form-control"
                    placeholder="Company discription"
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
           
            <Sidebar />
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Hey Admin, Add a new Company</h1>
                {addCompanyForm()}
            </div>
            <div className="mt-5 col-md-6 offset-md-3">
                {
                    setCompanies?.length !== 0 ? (
                        <ul className="list-group mb-4">
                      {companies?.map(company => (
                          <li key={company._id} className="list-group-item d-flex justify-content-between">
                              {company.name}
                              <div>
                               
                              <button className="btn btn-primary pl-5 pr-5 mr-3" onClick={(event) => { clickEdit(company._id,company.name) }}>
                               Edit
                              </button> 
                             
                             
                             <button className="btn btn-danger pl-5 pr-5" onClick={(event) => { clickDelete(company._id) }}>
                              Delete
                             </button>
                             <button className="btn btn-info pl-5 pr-5 ml-3" onClick={(event) => {  history.push({
                                pathname: '/venues',
                                search: '?query=abc',
                                state: { detail: company.name ,company_id : company._id}
                                }); }}>
                              Show venues
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

export default Companies;