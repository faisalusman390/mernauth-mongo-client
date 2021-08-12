import cookie from 'js-cookie';

// set in cookie
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};
// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};
// set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
// remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};
// access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};
export const checkValidEmail = (email) => {
    // eslint-disable-next-line
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    return validEmailRegex.test(email);
  };
  export const checkValidPassword = (password) => {
    const validPassRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
    return validPassRegex.test(password);
    
  };
  export const validateSubscription = (email,password) => {
  
    const msg = {
      email_msg: '',
      pass_msg: '',
    };
    if (email) {
      if (!checkValidEmail(email)) {
        msg.email_msg = 'INVALID_EMAIL';
      } if(!checkValidPassword(password)) {
        msg.pass_msg = 'INVALID_PASSWORD';
      }
    } else {
      msg.email_msg = 'EMAIL_MANDATORY';
    }
    if (msg.email_msg === '') {
      if (email.substring(email.lastIndexOf('.')).length > 11) {
        msg.email_msg = 'INVALID_EMAIL';
      }
    }
    console.log("password msg",msg)
    return msg;
  };
//   export const validatePassword = (password) => {
//     const msg = {
//       pass_msg: '',
//     };
//     if (password) {
//       if (!checkValidPassword(password)) {
//         msg.pass_msg = 'INVALID_PASSWORD';
//       } 
//     } else {
//       msg.pass_msg = 'PASSSWORD_MANDATORY';
//     }
  
//     return msg;
//   };