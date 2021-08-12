import axios from 'axios';

export const signIn = (email,password) => {
    return(
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/signin`,
        data: { email, password }
    })
    )
};

export const signUp = ( name,email,password) => {
    return (
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/signup`,
        data: { name, email, password }
    })
    )
};

export const getUser = () => {
    return (
    axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/getusers`,
    })
    )
};
export const getPost = () => {
    return (
    axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/getposts`,
    })
    )
};
export const finduser = (_id,user_cookie) => {
    return (
    axios({
        method: 'POST',
        headers: {token : user_cookie},
        url: `${process.env.REACT_APP_API}/findme`,
        data: { _id }
    })
    )
};
export const resettoken = (token) => {
    return (
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/reset-token`,
        data: { token }
    })
    )
};
export const forgotuser = (email) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/forgot-password`,
        data: { email }
    })
    )
};
export const resetuser = (newPassword,token) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/reset-password`,
        data: { newPassword, resetPasswordLink: token }
    })
    )
};
export const changepassword = (newPassword,token,user_id,oldpassword) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/change-password`,
        data: { newPassword, userToken: token,_id: user_id, old_password: oldpassword }
    })
    )
};
export const addproduct = (title,description,user_id) => {
    return (
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/add-product`,
        data: { title: title, description:description, user_id:user_id }
    })
    )
};
export const updateproduct = (product_id,title) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/update-product`,
        data: { _id: product_id,titleupdate: title}
    })
    )
};
export const deleteproduct = (product_id) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/delete-product`,
        data: { _id: product_id}
    })
    )
};
export const addcompany = (name,description,user_token) => {
    return (
    axios({
        method: 'POST',
        headers: {token : user_token},
        url: `${process.env.REACT_APP_API}/add-company`,
        data: { name, description }
    })
    )
};
export const getCompanies = (user_token) => {
    return (
    axios({
        method: 'GET',
        headers: {token : user_token},
        url: `${process.env.REACT_APP_API}/find-companies`,
    })
    )
};
export const updatecompany = (company_id,title) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/update-company`,
        data: { _id: company_id,titleupdate: title}
    })
    )
};
export const deletecompany = (product_id) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/delete-company`,
        data: { _id: product_id}
    })
    )
};
export const addvenue = (city,state,country,company_id,user_token) => {
    return (
    axios({
        method: 'POST',
        headers: {token : user_token},
        url: `${process.env.REACT_APP_API}/add-venue`,
        data: { city,state,country,company_id }
    })
    )
};
export const getVenues = (user_token,company_id_one) => {
    return (
    axios({
        method: 'GET',
        headers: {token : user_token},
        url: `${process.env.REACT_APP_API}/find-venues`,
        params: {company_id_one}
    })
    )
};
export const updatevenue = (venue_id,venue_name) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/update-venue`,
        data: { _id: venue_id,venue_name: venue_name}
    })
    )
};
export const deletevenue = (venue_id) => {
    return (
    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/delete-venue`,
        data: { _id: venue_id}
    })
    )
};