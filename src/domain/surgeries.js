import firebase from "./firebase";

/**
 * Get realtime updates on surgeries collection
 * @param {string} userId
 */
function getSurgeries(userId) {
  return firebase
    .firestore()
    .collection("surgeries")
    .where("userId", "==", userId);
}

export { getSurgeries };
