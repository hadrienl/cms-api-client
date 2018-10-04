import { storage, firestore } from './Firebase';
import moment from 'moment';

const storageRef = storage.ref();
const collection = firestore.collection('files');

export async function uploadFile(file) {
  const filename = file.name;
  const now = moment();
  const path = `files/${now.format('YYYY/MM/DD')}/${filename}`;
  const fileRef = storageRef.child(path);
  const res = await fileRef.put(file);
  const url = await res.ref.getDownloadURL();

  await collection.add({
    createdAt: new Date(Date.now()),
    path,
  });

  return url;
}
