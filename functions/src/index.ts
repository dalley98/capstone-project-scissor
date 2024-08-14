import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import { EventContext } from "firebase-functions";
// import { QueryDocumentSnapshot } from "firebase-admin/firestore";

admin.initializeApp();

exports.linkCreated = functions.firestore
  .document("users/{userUid}/links/{linkId}")
  .onCreate(async (snapshot, context) => {
    try{
      // Extract parameters from context
      const { userUid, linkId } = context.params
      const data = snapshot.data()

      // data extraction
      const longUrl = data.longUrl;
      const shortCode = data.shortCode;

      await admin.firestore().doc(`links/${shortCode}`).set({
        userUid,
        linkId,
        longUrl,
      });
    }catch(error){
        throw new Error("Failed to create link document");
    }
  });

exports.linkDeleted = functions.firestore
  .document("users/{userUid}/links/{linkId}")
  .onDelete(async (snapshot) => {
    try {
      const data = snapshot.data() as { shortCode: string };

      const shortCode = data.shortCode;

      await admin.firestore().doc(`links/${shortCode}`).delete();
    } catch (error) {
      throw new Error("Failed to delete link document");
    }
  });
