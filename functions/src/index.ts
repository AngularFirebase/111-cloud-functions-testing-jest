import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// Firestore Function
export const lowercaseBio = functions.firestore
  .document('animals/{animalId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const bio = data.bio.toLowerCase();

    return admin
      .firestore()
      .doc(`animals/${snap.id}`)
      .update({ bio });
  });

// User Auth Function
export const createUserRecord = functions.auth
  .user()
  .onCreate((user, context) => {
    return admin
      .firestore()
      .doc(`users/${user.uid}`)
      .set({ ranking: 'noob' });
  });

// HTTP Function
export const makePayment = functions.https.onRequest((req, res) => {
  if (!req.body.card) {
    res.send('Missing card!');
  } else {
    res.send('Payment processed!');
  }
});
