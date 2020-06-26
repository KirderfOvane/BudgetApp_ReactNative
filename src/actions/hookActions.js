import axios from 'axios';
import trackerApi from '../api/tracker';

export const getUser = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'My_User-Agent': 'native',
      'x-auth-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWRjNDQ0ZGIzYzNiMzkxMzA0ZGUyM2I3In0sImlhdCI6MTU5MzE5NzgzN30.jKLArw3fZ1FuYmEaB0s8M8GqbdbCb2CW56ZEPjnU1Ig',
    },
  };
  try {
    //const response = await trackerApi.get('/api/auth', config); <-- moxios DONT LIKE THIS, no contact with axios?
    const response = await axios.get('http://626a849f851d.ngrok.io', config);
    return response.data;
    // setMyUser(response.data);
  } catch (err) {
    console.log(err.message);
  }
};

// defaul export for mocking convenience

export default { getUser };

//working
/* export const getUser = async (setMyUser) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'My_User-Agent': 'native',
      'x-auth-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU0M2M1NDg4ZGY2OTYzOTY4MzFlOWQzIn0sImlhdCI6MTU5MzAxNzM0NX0.Vt7XvMYMRyl-IrmKBYgp_GK7Jnea6tyCwievupmeoeU',
    },
  };
  try {
    //const response = await trackerApi.get('/api/auth', config); <-- moxios DONT LIKE THIS, no contact with axios?
    const response = await axios.get('http://70ab4fd808f2.ngrok.io/api/auth', config);

    setMyUser(response.data);
  } catch (err) {
    console.log(err.message);
  }
};
*/
