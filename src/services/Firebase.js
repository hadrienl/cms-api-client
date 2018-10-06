import firebase from 'firebase';
import config from '../config/firebase';

//
global.firebase = firebase;
//
export default firebase;

firebase.initializeApp(config);
export const firestore = firebase.firestore && firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export const storage = firebase.storage && firebase.storage();
export const auth = firebase.auth && firebase.auth();

export function convertStrings(obj) {
  for (const attr of Object.keys(obj)) {
    const value = obj[attr];
    if (typeof value === 'string') {
      obj[attr] = value.replace(/\\n/g, '\n');
    }
  }
  return { ...obj};
}

export function convertDates(obj) {
  for (const attr of Object.keys(obj)) {
    const value = obj[attr];
    if (value.constructor.name === 'Timestamp') {
      obj[attr] = new Date(value.seconds * 1000);
    }
  }
  return { ...obj};
}

export function convert(obj) {
  return convertDates(convertStrings(obj));
}
