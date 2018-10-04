import { storage, firestore, convert } from './Firebase';
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

export async function listFiles() {
  const querySnapshot = await collection.get();
  const res = [];
  querySnapshot.forEach(doc => res.push({
    id: doc.id,
    ...convert(doc.data())
  }));

  return Promise.all(res.map(async ref => {
    const { url, name } = await getFile(ref.path);
    return {
      ...ref,
      name,
      url,
    };
  }));
}


export async function getFile(path) {
  const fileRef = storageRef.child(path);
  const url = await fileRef.getDownloadURL();
  return { url, name: fileRef.name };
}
