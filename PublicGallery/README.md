# 컨트롤 + 쉬프트 V

### 구조

- [ ] RootStack
  - [ ] MainTab
    - [ ] HomeStack
      - [ ] FeedScreen
      - [ ] PostScreen
      - [ ] ProfileScreen
    - [ ] MyProfileStack
      - [ ] MyProfileScreen
  - [ ] PostScreen
    - [ ] UploadScreen
    - [ ] ModifyScreen
    - [ ] SettingScreen
    - [ ] SignInScreen
    - [ ] WelcomeScreen

---

- RootStack - 최상위 스택(화면)
  - MainTab - 로그인하면 보일 화면
    - HomeStack - 첫 번째 탭인 홈의 스택
      - FeedScreen - 포스트들의 목록을 볼 수 있는 화면
      - PostScreen - 하나의 포스트를 볼 수 있는 화면
      - ProfileScreen - 특정 사용자의 프로필을 볼 수 있는 화면
    - MyProfileStack - 두번째 탭인 프로필의 스택
      - MyProfileScreen - 자신의 프로필을 볼 수 있는 화면
  - PostScreen - 하나의 포스트를 볼 수 있는 화면, HomeStack이랑 컴포넌트 공유 예정
    - UploadScreen - 사진을 업로그 하는 화면
    - ModifyScreen - 포스트의 문구를 수정하는 화면
    - SettingScreen - 설정 화면
    - SignInScreen - 로그인 화면
    - WelcomeScreen - 회원가입 후 프로필 사진과 이름을 설정하는 화면

---

### 회원인증

Firebase로 간단하게 구현 가능함
