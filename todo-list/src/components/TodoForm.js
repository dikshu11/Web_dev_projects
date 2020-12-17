import React, { useState } from 'react';
import "./components.css"

function TodoForm({addTodo}){
    const [todo, setTodo] = useState({
        id: "",
        task: "",
        completed: false
    });

    function handleTaskInputChange(e){
        console.log('handleTaskInputChange was triggered task: ' + todo.task )
        setTodo({...todo, task: e.target.value });
    }

    function handleSubmit(e){
        e.preventDefault(); // prevents browser refresh
        if( todo.task.trim() ){
            // console.log('handleSubmit task is added: ' + todo.task + 10 + Math.random() * (1000 - 10) )
            addTodo( { ...todo, id : 10 + Math.random() * (1000 - 10)  } );
            setTodo({ ...todo, task : ""});
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='todoForm'>
                <label>Add a new to-do task</label>
                <br/>
                <input 
                    name = "task"
                    type = "text"
                    value = {todo.task}
                    onChange = {handleTaskInputChange}
                />
                <br/>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default TodoForm;