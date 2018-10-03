import firestore, { convert } from './Firebase';

const collection = firestore.collection('posts')

export async function getPosts({ page = 1, perPage = 10 }) {
  const querySnapshot = await collection
    .orderBy('createdAt')
    .limit(perPage)
    .get();

  const res = [];
  querySnapshot.forEach(doc => res.push({
    id: doc.id,
    ...convert(doc.data())
  }));
  return res;
}

export async function getPostBy({ id, slug }) {
  const querySnapshot = await collection
    .where('slug', '==', slug)
    .get();

  const res = [];
  querySnapshot.forEach(doc => res.push({
    id: doc.id,
    ...convert(doc.data())
  }));
  return res[0];
}
