import React, {useRef} from 'react';
import BorderInput from './BorderInput';

function SignForm({form, createChangeTextHandler, isSignUp, onSubmit}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderInput
        hasMarginBottom
        placeholder={'이메일'}
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none" // 첫문자 대문자 비활성화
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address" // 키보드 타입 설정
        returnKeyType="next" // 키보드 엔터 값
        onSubmitEditing={() => passwordRef.current.focus()} // enter 누르면 동작
      />
      <BorderInput
        placeholder={'비밀번호'}
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        secureTextEntry // 패스워드 * 처리
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderInput
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}

export default SignForm;
