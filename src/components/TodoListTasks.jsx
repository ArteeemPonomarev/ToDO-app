import React from 'react';
import TodoListTask from './TodoListTask';
import PropTypes from 'prop-types';

class TodoListTasks extends React.Component {
    render = () => {

        // let myFn = t => {
        //     return <TodoListTask task={t} changeStatus={this.props.changeStatus} />
        // }
        let taskElements = this.props.tasks.map(t => <TodoListTask task={t}
                                                                   key={t.id}
                                                                   todolistId={this.props.id}
                                                                   changeStatus={this.props.changeStatus}
                                                                   changeTitle={this.props.changeTitle}/>);

        return (   
        <div className="todoList-tasks">
            {taskElements}
        </div>      
        );
    }
}

export default TodoListTasks;

TodoListTasks.propTypes = {
    tasks: PropTypes.array
}

