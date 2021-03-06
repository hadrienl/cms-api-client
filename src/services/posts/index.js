import firebase, { firestore, convert } from '../Firebase';
import slug from 'slug';

const collection = firestore.collection('posts')

export async function getPosts({ page = 1, perPage = 10 }) {
  const querySnapshot = await collection
    .orderBy('createdAt')
    //.limit(perPage)
    .get();

  const res = [];
  querySnapshot.forEach(doc => res.push({
    id: doc.id,
    ...convert(doc.data())
  }));
  return res;
}

export async function getPostBy({ id, slug }) {
  if (id) {
    const querySnapshot = await collection.doc(id).get();
    return {
      id: querySnapshot.id,
      ...convert(querySnapshot.data())
    };
  }

  if (slug) {
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

  throw new Error('`id` or `slug` are mandatory');
}

export async function savePost(post) {
  return post.id
  ? updatePost(post)
  : createPost(post);
}

async function createPost(data) {
  const { id, ...post } = data;

  post.createdAt = new Date();
  const { id: postId } = await collection.add(cleanPost(post));
  return postId;
}

async function updatePost(data) {
  const { id, ...post } = data;
  await collection.doc(id).update(cleanPost(deleteAttrs(post)));
  return id;
}

function cleanPost (post) {
  post.title = post.title || 'Sans titre';
  post.slug = slug(post.slug || post.title);
  return post;
}

function deleteAttrs (post) {
  return Object.keys(post).reduce((newPost, attr) => ({
    ...newPost,
    [attr]: post[attr]
      ? post[attr]
      : firebase.firestore.FieldValue.delete()
  }), {});
}
