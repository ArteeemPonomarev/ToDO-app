import React from 'react';
import TodoListTask from './TodoListTask';


class TodoListTasks extends React.Component {
    render = () => {
        return (
            
        <div className="todoList-tasks">
            <TodoListTask type="checkbox" bool={true} tech="CSS" />
            <TodoListTask type="checkbox" bool={false} tech="JS" />
            <TodoListTask type="checkbox" bool={false} tech="ReactJS" />
            <TodoListTask type="checkbox" bool={true} tech="Patterns" />
        </div>      
        );
    }
}

export default TodoListTasks;

