import auth from '@react-native-firebase/auth';

export function signIn({email, password}) {
  if (email === '' || password === '') {
    throw {code: 'auth/empty'};
  }

  // 로그인
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  if (email === '' || password === '') {
    throw {code: 'auth/empty'};
  }

  // 회원가입
  return auth().createUserWithEmailAndPassword(email, password);
}

// context API 사용해서 관리
export function subscribeAuth(callback) {
  // 로그인 했는지 안했는지 확인하는 방법,
  // 상태를 subscribe하고 해당 상태가 변경될때마다 callback이 동작하는 사이클
  return auth().onAuthStateChanged(callback);
}

export function signOut() {
  // 로그아웃
  return auth().signOut();
}
