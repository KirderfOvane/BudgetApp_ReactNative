import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    //console.log('setAuthToken found token and created headers');
    // console.log(token);
  } else {
    //  console.log('deleted token from header');
    delete axios.defaults.headers.common['x-auth-token'];
    //  console.log(axios.defaults.headers.common);
  }
};

export default setAuthToken;
