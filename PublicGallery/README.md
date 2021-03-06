# 컨트롤 + 쉬프트 V

### 구조

- [x] RootStack
  - [x] MainTab
    - [x] HomeStack
      - [x] FeedScreen
      - [x] PostScreen
      - [x] ProfileScreen
    - [x] MyProfileStack
      - [x] MyProfileScreen
  - [x] PostStack
    - [x] UploadScreen
    - [x] ModifyScreen
    - [x] SettingScreen
    - [x] SignInScreen
    - [x] WelcomeScreen

---

- RootStack - 최상위 스택(화면)
  - MainTab - 로그인하면 보일 화면
    - HomeStack - 첫 번째 탭인 홈의 스택
      - FeedScreen - 포스트들의 목록을 볼 수 있는 화면
      - PostScreen - 하나의 포스트를 볼 수 있는 화면
      - ProfileScreen - 특정 사용자의 프로필을 볼 수 있는 화면
    - MyProfileStack - 두번째 탭인 프로필의 스택
      - MyProfileScreen - 자신의 프로필을 볼 수 있는 화면
  - PostStack - 하나의 포스트를 볼 수 있는 화면, HomeStack이랑 컴포넌트 공유 예정
    - UploadScreen - 사진을 업로그 하는 화면
    - ModifyScreen - 포스트의 문구를 수정하는 화면
    - SettingScreen - 설정 화면
    - SignInScreen - 로그인 화면
    - WelcomeScreen - 회원가입 후 프로필 사진과 이름을 설정하는 화면

---

Firebase로 간단하게 구현 가능함  
로그인 화면에서 MainTab으로 바로 넘겨주면 Stack에 정보가 남아있어서 이전 화면이 다시 노출된다.
navigation의 reset기능이 있지만 버그가 많아서 비추천  
그래서 특정 조건에선 RootStack에서 불필요한 화면들을 제거하는 방법으로 구현
@react-native-community/cameraroll <- 이미지를 선택하는 UI를 react-native로 직접 만들 수 있도록 도와주는 라이브러리  
[ ] launchImageLibrary 사용시 안드로이드에서는 BASE64로 읽지 않으면 uri에서 값을 읽어올 때 문제가 발생하는게 지금도 발생하는지 확인 필요. (Google Photo 사용하는 기기에서 발생함)     
subscribeAuth() 의 return 값은 unsubscribe. 즉, 해당 상태를 지켜보는 (subscribe) 상태를 해제해주는 메서드임.      
IOS에서 텍스트를 입력할때 enter를 막 많이 입력하면 텍스트가 야랄나서 이상하게 보이는 현상이 발생할 수 있어서 KeyboardAvoidingView로 막아줘야함    
DB에서의 색인(index) 기능     
페이지에 데이터를 추가 로딩해주는걸 페이지네이션이라고 하는 듯 ?      
상태를 갱신? 해주는 방법들이 있음. 전역 상태로 선언해서 관리를 해도 되고, 리덕스 써도 되고, 리코일 라이브러리 써도 되고 리액트 쿼리 써도 되는데 지금 이책에서는 이벤트 리스너 사용할 예정임 ( spring eventListener, interceptor )   
