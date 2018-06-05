import 'jest';

import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';

// Online Testing
const testEnv = functions({
    databaseURL: 'https://firestarter-96e46.firebaseio.com',
    storageBucket: 'firestarter-96e46.appspot.com',
    projectId: 'firestarter-96e46',
  }, './service-account.json');


// Provide 3rd party API keys
testEnv.mockConfig({ someapi: { key: 'abc123' }});


import { lowercaseBio, createUserRecord } from '../src';


/// FIRESTORE

describe('downcaseBio', () => {
  let wrapped;
  // Applies only to tests in this describe block
  beforeAll(() => {
    wrapped = testEnv.wrap(lowercaseBio);
  });

  test('it converts the bio to lowercase', async () => {
    const path = 'animals/meerkat'
    const data = { bio: 'SUPER COOL' };

    // Create a Firestore snapshot
    const snap = testEnv.firestore.makeDocumentSnapshot(data, path);

    // Execute it
    await wrapped(snap);

    const after = await admin.firestore().doc(path).get()

    expect(after.data().bio).toBe('super cool')

  });
});


describe('createUserRecord', () => {
  let wrapped;
  // Applies only to tests in this describe block
  beforeAll(() => {
    wrapped = testEnv.wrap(createUserRecord);
  });

  afterAll( () => {
    admin.firestore().doc(`users/dummyUser`).delete()
    testEnv.cleanup();
  });

  test('it creates a user record in Firestore', async () => {
    const user = testEnv.auth.makeUserRecord({ uid: 'dummyUser' })
    await wrapped(user);

    const doc = await admin.firestore().doc(`users/${user.uid}`).get();

    expect(doc.data().ranking).toBe('noob');
  });
});


