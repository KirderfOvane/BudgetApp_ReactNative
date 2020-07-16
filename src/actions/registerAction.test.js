import moxios from 'moxios';

import { sendRegister } from './registerAction';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('sendRegister gets axios response', async () => {
    const mockResponseToken = 'token';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: mockResponseToken,
      });
    });

    const res = await sendRegister();

    expect(res).toBe(mockResponseToken);
  });
});
