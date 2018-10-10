import Cache from '../Cache';
const CACHE = new Cache('posts');

export function getPost(id) {
  return CACHE.get(id);
}

export function addPost(post) {
  if (!post.id) return;
  CACHE.set(post.id, post);
}

export function addPosts(posts) {
  posts.forEach(post => addPost(post));
}

export function addToList(posts, page = 1, perPage = 10) {
  addPosts(posts);
  const list = [...(CACHE.get('list') || [])];
  const from = (page - 1) * perPage;
  const to = Math.min(posts.length, perPage) + from;
  list.length = Math.max(list.length, to);
  posts.forEach(({ id }, k) => list[k + from] = id);
  CACHE.set('list', list);
}

export function getListPage(page, perPage) {
  const list = [...(CACHE.get('list') || [])];
  const from = (page - 1) * perPage;
  const to = from + perPage;

  return list.splice(from, to).map(id => getPost(id));
}
