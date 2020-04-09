import firebase from './firebase';

/**
 * Promisified version of the onAuthStateChanged Firebase function
 * This function provides the authenticated user or null
 * Will reject the promise if something bad happends with the Firebase function
 */
function getUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();

      if (!user) {
        return resolve(null);
      }

      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          const userProfile = documentSnapshot.data();

          return resolve({
            user: {
              displayName: userProfile.displayName,
              email: user.email,
              uid: user.uid,
            },
          });
        })
        .catch(e => {
          logout();
          console.error(e);
          reject(e);
        });
    }, reject);
  });
}

/**
 * Login the user with email and password
 *
 * @param {string} email The email of the user
 * @param {string} password The password of the user
 */
function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

/**
 * Logout the current user calling Firebase singOut function
 */
function logout() {
  return firebase.auth().signOut();
}

export { login, logout, getUser };
