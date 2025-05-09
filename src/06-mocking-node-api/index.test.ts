// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('path', () => ({
  join: jest.fn(),
}));
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  let mockCallback: jest.Mock;
  const delay = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockCallback = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, delay);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, delay);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockCallback, delay);
    expect(mockCallback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let mockCallback: jest.Mock;
  const interval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockCallback = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockCallback, interval);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const n = 3;
    doStuffByInterval(mockCallback, interval);
    jest.advanceTimersByTime(n * interval);
    expect(mockCallback).toHaveBeenCalledTimes(n);
  });
});

describe('readFileAsynchronously', () => {
  const mockPath = 'file.txt';
  const mockFullPath = '/RSS/NodeJs-course-2025/03-basic-testing/file.txt';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(mockPath);
    expect(join).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBeNull();
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    const mockContent = Buffer.from('Mock content');

    (join as jest.Mock).mockReturnValue(mockFullPath);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(mockContent);

    const result = await readFileAsynchronously(mockPath);

    expect(readFile).toHaveBeenCalledWith(mockFullPath);
    expect(result).toBe('Mock content');
  });
});
