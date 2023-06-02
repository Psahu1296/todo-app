import React, { createContext, useState } from 'react';

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  subTodos: {
    id: number;
    text: string;
    isCompleted: boolean;
  }[];
}

interface UserContextProps {
  username: string;
  password: string;
  todos: Todo[];
  updateUsername: (args: string) => void;
  updatePassword: (args: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const UserContext = createContext<UserContextProps>({
  username: '',
  password: '',
  todos: [],
  updateUsername: () => {},
  updatePassword: () => {},
  setTodos: () => {}
});
type Props = {
    children: string | JSX.Element | JSX.Element[] 
  }
const UserProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const updateUsername = (args: string) => {
    setUsername(args);
  };

  const updatePassword = (args: string) => {
    setPassword(args);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        password,
        todos,
        updateUsername,
        updatePassword,
        setTodos
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
