import { getAllFromCollection } from 'domain/firebase';

/**
 * TODO: Next we will query with the userId to grab only the surgeries of that user maybe
 */
async function getSocials() {
  const snapshot = await getAllFromCollection('socials');

  return snapshot.docs.map(doc => doc.data().name);
}

export { getSocials };
