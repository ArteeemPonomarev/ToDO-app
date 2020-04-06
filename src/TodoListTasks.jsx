import React from 'react';
import TodoListTask from './TodoListTask';


class TodoListTasks extends React.Component {
    render = () => {

        let taskElements = this.props.tasks.map(elem => <TodoListTask isDone={elem.isDone} title={elem.title} priority={elem.priority}/>);

        return (   
        <div className="todoList-tasks">
            {taskElements}
        </div>      
        );
    }
}

export default TodoListTasks;

