import firestore from '@react-native-firebase/firestore';
export const PAGE_SIZE = 12;
export const postsCollection = firestore().collection('posts');

export function createPost({user, photoURL, description}) {
  // ID를 알고잇을때에는 doc.set, 모를땐 add
  return postsCollection.add({
    user,
    photoURL,
    description,
    createAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getPosts({userId, id, mode} = {}) {
  let query = postsCollection.orderBy('createAt', 'desc').limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  if (id) {
    const cursorDoc = await postsCollection.doc(id).get();
    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot = await query.get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getOlderPosts(id, userId) {
  // startAt도 있는데 얘는 id에 해당하는 값도 포함해서 넘겨주고 startAfter는 id에 해당하는 제외하고 넘겨줌
  /* const cursorDoc = await postsCollection.doc(id).get();
  let query = postsCollection
    .orderBy('createAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  const snapshot = await query.get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
 */

  return getPosts({
    mode: 'older',
    id,
    userId,
  });
}

export async function getNewerPosts(id, userId) {
  // endBefore - 특정 문서 이전의 문서들을 조회해준다(최신)
  // 얘도 before랑 at이 있음 의미는 after, at이랑 같음
  /* const cursorDoc = await postsCollection.doc(id).get();
  let query = postsCollection
    .orderBy('createAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  const snapshot = await query.get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })); */

  return getPosts({
    mode: 'newer',
    id,
    userId,
  });
}

export function removePost(id) {
  return postsCollection.doc(id).delete();
}

export function updatePost({id, description}) {
  return postsCollection.doc(id).update({
    description,
  });
}
