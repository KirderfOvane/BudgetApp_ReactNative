import moxios from 'moxios';

import { getUser } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('getUser gets axios response', async () => {
    /*   
      To test this you need a valid/fresh token , fresh ngrok link pasted in the get http
      and you need to target axios.get(...) and not apitracker.get
    */
    const mockUserValue = {
      __v: 0,
      _id: '5e43c5488df696396831e9d3',
      date: '2020-02-12T09:28:40.100Z',
      email: 'newuser@gmail.com',
      name: 'newuser',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: mockUserValue,
      });
    });

    // create mock for callback arg
    // const mockSetMyUser = jest.fn();

    //await getUser(mockSetMyUser);
    const res = await getUser();
    //console.log(res);
    // see whether mock was run with the correct argument
    expect(res).toBe(mockUserValue);
  });
});
