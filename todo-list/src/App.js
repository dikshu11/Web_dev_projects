import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

const LOCAL_STORAGE_KEY = "react-to-list";

function App() {
  const [todos, setTodos] =  useState([]);

  

  useEffect(() => {
    const storedTodos = JSON.parse( localStorage.getItem(LOCAL_STORAGE_KEY));
    if( storedTodos ){
      setTodos( storedTodos )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo){
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id){
    setTodos(
      todos.map( todo => {
        if( todo.id === id ){
            return {
                ...todo,
              completed : !todo.completed
            }
        }
        return todo;
      })
    )
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
      <h1 style={{fontSize:"50px", 
                fontFamily:"Verdana",
                color:"blue"
                }}> My TodoList </h1>
      <br/>
      <TodoForm addTodo={addTodo}/>
      <br/>
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete}
        removeTodo={removeTodo} 
      />
    </div>
  );
}

export default App;
