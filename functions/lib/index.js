"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// import * as admin from 'firebase-admin';
// admin.initializeApp();
exports.lowercaseBio = functions.firestore
    .document('animals/{animalId}')
    .onCreate((snap, context) => {
    const data = snap.data();
    const bio = data.bio.toLowerCase();
    return null; // admin.firestore().doc(`animals/${snap.id}`).update({ bio })
});
//# sourceMappingURL=index.js.map