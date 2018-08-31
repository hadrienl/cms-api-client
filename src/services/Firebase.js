import firebase from 'firebase';
import config from '../config/firebase';

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
global.firebase = firebase;
export default firestore;
export { firebase };

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
