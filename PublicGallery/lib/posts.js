import firestore from '@react-native-firebase/firestore';
export const PAGE_SIZE = 3;
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

export async function getPosts() {
  const snapshot = await postsCollection
    .orderBy('createAt', 'desc')
    .limit(PAGE_SIZE)
    .get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getOlderPosts(id) {
  const cursorDoc = await postsCollection.doc(id).get();
  // startAt도 있는데 얘는 id에 해당하는 값도 포함해서 넘겨주고 startAfter는 id에 해당하는 제외하고 넘겨줌
  const snapshot = await postsCollection
    .orderBy('createAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE)
    .get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}

export async function getNewerPosts(id) {
  const cursorDoc = await postsCollection.doc(id).get();
  // endBefore - 특정 문서 이전의 문서들을 조회해준다(최신)
  // 얘도 before랑 at이 있음 의미는 after, at이랑 같음
  const snapshot = await postsCollection
    .orderBy('createAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
