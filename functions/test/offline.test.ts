import 'jest';

import * as admin from 'firebase-admin';
import * as TestFunctions from 'firebase-functions-test';
const testEnv = TestFunctions();

import { makePayment } from '../src';

/// HTTP

describe('makePayment', () => {

  
  test('it returns a successful response with a valid card', (done) => {
    // A fake request object, with req.query.text set to 'input'
    const req = { body: { card: '4242424242424242' } };
    // A fake response object, with a stubbed redirect function which does some assertions
    const res = {
      send: (payload) => {
        expect(payload).toBe('Payment processed!')
        done();
      }, 
    };

    makePayment(req as any, res as any);
  }); 


  test('it returns an error with an invalid card', (done) => {
    const req = { body: { card: null } };
    const res = {
      send: (payload) => {
        expect(payload).toBe('Missing card!')
        done();
      }, 
    };
    
    makePayment(req as any, res as any);
  });
});

