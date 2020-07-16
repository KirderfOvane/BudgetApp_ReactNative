import { AsyncStorage } from 'react-native';
import axios from 'axios';
import trackerApi from '../api/tracker';

export const sendRegister = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'My_User-Agent': 'native',
    },
  };

  try {
    const res = await trackerApi.post('/api/users', formData, config); //endpoint/url
    console.log(res);
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { sendRegister };
