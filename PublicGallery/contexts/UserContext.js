import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
      children={children}
    />
  );
}

// 그냥 useContext(UserContext)를 함수화 한 것
export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return userContext;
}
