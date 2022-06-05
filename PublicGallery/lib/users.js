import firestore from '@react-native-firebase/firestore';
// 기본 구조는 mongoDB랑 유사한듯

// collection === table
export const usersCollection = firestore().collection('users');

export function createUser({id, displayName, photoURL}) {
  // doc === column
  // users collection 안에 doc이 id에 해당하는 값을 저장
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getUser(id) {
  // doc의 값이 id에 해당하는 값을 가져옴
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
