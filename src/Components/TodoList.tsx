import React, { useContext, useEffect, useState } from "react";
import AuthGuard from "./AuthGuard";
import { deleteIcon } from "../assets";
import TodoItem from "./TodoItems";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import {  Todo } from "./UserProvider";
import { validateTodo } from "../utils/utils";

// export interface Todo {
//   id: number;
//   text: string;
//   isCompleted: boolean;
//   subTodos: {
//     id: number;
//     text: string;
//     isCompleted: boolean;
//   }[];
// }

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [showTodo, setShowTodo] = useState<number>(0);
  const [signError, setSignError] = useState<string>("");

  const { username, updateUsername, todos, setTodos } = useContext(UserContext);
  const navigate =   useNavigate()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignError('')
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    const newT = newTodo.trim()
    if (newT === ""){
      setSignError("Please enter valid todo name");
      return;
    }
    const ValidTodo = validateTodo(todos, newT);
    if( ValidTodo ) {
      setSignError(ValidTodo)
      return
    }
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      isCompleted: false,
      subTodos: [],
    };

    setTodos((prevTodos) => [...prevTodos, todo]);
    setNewTodo("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const logOut = () => {
    localStorage.clear()
    navigate('/login')
  }
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      updateUsername(JSON.parse(data).user);
    }
  });

  return (
    <div className="main">
      <header className="header" style={{ color: "rgba(61,131,97,1)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>User : <span style={{ color: "#e4630d", fontWeight: 400 }}>{username} </span></h3>
        <button className="logout" onClick={logOut}>Logout</button>
      </header>
      <h1 style={{ color: "rgba(61,131,97,1)", marginTop: 40}}>Todo List</h1>
      <div className="input-area">
        <input
          type="text"
          className="todo_input"
          placeholder="Add new todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
        <p className="error" style={{visibility: signError? 'visible': 'hidden', marginTop: 5}}>*{signError}</p>
      <div className="todo_list">
        {todos.map((todo, idx) => (
          <div
            key={todo.id}
            style={{ display: "flex", alignItems: "center", marginTop: 10 }}
          >
            <TodoItem
              todo={todo}
              onDelete={handleDeleteTodo}
              setTodos={setTodos}
              onToggle={handleToggleTodo}
              showTodo={showTodo}
              setShowTodo={setShowTodo}
              idx={idx}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthGuard(TodoList);