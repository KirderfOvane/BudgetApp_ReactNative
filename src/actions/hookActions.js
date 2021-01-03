import axios from 'axios';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*   
      To run this you need a valid/fresh token , fresh ngrok link pasted in the get http
      and you need to target axios.get(...) and not apitracker.get
    */

export const getUser = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'my_user-agent': 'native',
      'x-auth-token': axios.defaults.headers.common['x-auth-token'],
    },
  };
  try {
    //const response = await trackerApi.get('/api/auth', config); <-- moxios DONT LIKE THIS, no contact with axios?
    const response = await trackerApi.get('/api/auth', config);

    return response.data;
  } catch (err) {
    console.log('getUser failed');
    console.log(err.message);
    await AsyncStorage.removeItem('token'); //Viktig!. Om denna inte finns så kan användare ej logga in nånsin om deras token skulle bli invalid av någon anledning
  }
};

// defaul export for mocking convenience
export default { getUser };
