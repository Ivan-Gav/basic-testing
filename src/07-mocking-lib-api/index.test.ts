// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as ReturnType<typeof axios.create>);

    const response = throttledGetDataFromApi('/test');
    jest.runAllTimers();
    await response;

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as ReturnType<typeof axios.create>);

    const response = throttledGetDataFromApi('/test');
    jest.runAllTimers();
    await response;

    expect(mockedAxios.create).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const mockResponse = { data: { id: 1, title: 'Test' } };
    const mockGet = jest.fn().mockResolvedValue(mockResponse);

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as ReturnType<typeof axios.create>);

    const response = throttledGetDataFromApi('/test');
    jest.runAllTimers();

    const data = await response;

    expect(data).toEqual(mockResponse.data);
  });
});
