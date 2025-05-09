// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let balance: number;
  let balance2: number;
  let account: BankAccount;
  let account2: BankAccount;

  beforeEach(() => {
    balance = 100;
    balance2 = 1;
    account = getBankAccount(balance);
    account2 = getBankAccount(balance2);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(balance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(balance + 1, account2)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(balance - 1, account)).toThrow();
  });

  test('should deposit money', () => {
    account.deposit(100);
    expect(account.getBalance()).toBe(balance + 100);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(balance - 50);
  });

  test('should transfer money', () => {
    account.transfer(50, account2);
    expect(account.getBalance()).toBe(balance - 50);
    expect(account2.getBalance()).toBe(balance2 + 50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBallance = await account.fetchBalance();
    expect(
      typeof fetchedBallance === 'number' || fetchedBallance === null,
    ).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockedBalance = 42;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockedBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
