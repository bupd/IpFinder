// fetchIPAddress.test.js

const fetchIPAddress = require('../findIp.mjs'); // Replace with the actual path

describe('fetchIPAddress function', () => {
  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        Answer: [{ data: '127.0.0.1' }],
      }),
    })
  );

  // Reset the mock after each test
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch the IP address for a valid domain', async () => {
    const domain = 'example.com';
    const ipAddress = await fetchIPAddress(domain);
    expect(ipAddress).toBe('127.0.0.1');
  });

  it('should handle an invalid domain', async () => {
    const domain = 'invalid-domain';
    const ipAddress = await fetchIPAddress(domain);
    expect(ipAddress).toBeNull();
  });

  it('should handle a network error', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
    const domain = 'example.com';
    const ipAddress = await fetchIPAddress(domain);
    expect(ipAddress).toBeNull();
  });
});

