import React from 'react';
import Todo from "./Todo";

function TodoList({todos, toggleComplete, removeTodo}){
    return(
        <div >
            <br/>
            <h2 style={{fontSize:"50px", 
                fontFamily:"Verdana",
                color:"blue"
                }}> All tasks </h2>
            { todos.map( todo => (
                <Todo key={todo.id} 
                    todo={todo} 
                    toggleComplete={toggleComplete} 
                    removeTodo={removeTodo} />
            ))}
        </div>
    )
}

export default TodoList;