import firebaseApp, { getAllFromCollection, firebase } from "domain/firebase";

/**
 * Get realtime updates on surgeries collection by userId
 * @param {string} userId
 */
async function getSurgeriesByUserId(userId) {
  const snapshot = await getAllFromCollection("surgeries", [
    {
      field: "userId",
      operation: "==",
      value: userId
    }
  ]);

  return snapshot.docs.map(surgeryTransformer);
}

function surgeryTransformer(surgery) {
  return {
    ...surgery.data(),
    id: surgery.id
  };
}

async function getSurgeriesByUserAndMonth(userId, month) {
  const today = new Date();
  const startAt = new Date(today.getFullYear(), month, 1, 0, 0, 0);
  const endAt = new Date(today.getFullYear(), month + 1, 0, 23, 59, 59);

  const userSnapshot = await firebaseApp
    .firestore()
    .collection("users")
    .doc(userId)
    .get();

  const surgeriesSnapshot = await userSnapshot.ref
    .collection("surgeries")
    .orderBy("date")
    .startAt(startAt)
    .endAt(endAt)
    .get();

  return surgeriesSnapshot.docs.map(surgeryTransformer);
}

/**
 *
 * @param surgery The surgery
 * @param surgery.affiliate Affiliate number
 * @param surgery.affiliateName Affiliate number
 * @param surgery.center The location of the surgery
 * @param surgery.date The date of the surgery
 * @param surgery.doctor The doctor of the surgery
 * @param surgery.social The social of the surgery (Obra social)
 * @param surgery.surgery The type of the surgery
 * @param surgery.userId Logged userId
 */
async function newSurgery(surgery) {
  return firebaseApp
    .firestore()
    .collection("users")
    .doc(surgery.userId)
    .collection("surgeries")
    .add({
      ...surgery,
      createdAt: firebase.firestore.Timestamp.now(),
      date: firebase.firestore.Timestamp.fromDate(surgery.date)
    });
}

export { getSurgeriesByUserId, getSurgeriesByUserAndMonth, newSurgery };
