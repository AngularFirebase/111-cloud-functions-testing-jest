import 'jest';

import * as admin from 'firebase-admin';
import * as TestFunctions from 'firebase-functions-test';
const testEnv = TestFunctions();

import { makePayment } from '../src';

/// HTTP

describe('makePayment', () => {

  
  test('it returns a successful response with a valid card', () => {
    const req = { body: { card: '4242424242424242' } };
    const res = {
      send: (payload) => {
        expect(payload).toBe('Payment processed!')
      }, 
    };

    makePayment(req as any, res as any);
  }); 


  test('it returns an error with an invalid card', () => {
    const req = { body: { card: null } };
    const res = {
      send: (payload) => {
        expect(payload).toBe('Missing card!')
      }, 
    };
    
    makePayment(req as any, res as any);
  });
});

