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

    const res = await getUser();

    expect(res).toBe(mockUserValue);
  });
});
