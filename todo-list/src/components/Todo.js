import React from 'react';
import './components.css';



function Todo({todo, toggleComplete, removeTodo}){

    function handleCheckBoxClick(){
        toggleComplete(todo.id);
    }
    
    function handleRemoveClick(){
        // console.log("Removing todo:", todo.id, todo.task)
        removeTodo(todo.id);
    }

    return (
        <div className='todo'>
            <input type="checkbox" onClick={handleCheckBoxClick}/>
            <p  style={{
                textDecoration: todo.completed ? "line-through" : null
            }}> {todo.task} </p>
            <button onClick={handleRemoveClick}> X </button>
            
        </div>
    )
}

export default Todo;