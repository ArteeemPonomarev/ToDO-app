import React from 'react';


class TodoListHeader extends React.Component {
    render = () => {
        return (
                 <div className="todoList-header">
                    <h3 className="todoList-header__title">What to Learn</h3>
                    <div className="todoList-newTaskForm">
                        <input type="text" placeholder="New task name" ref = {this.props.newTaskTitleRef} />
                        <button onClick = {this.props.onAddTaskClick}>Add</button>
                    </div>
                </div>       
        );
    }
}

export default TodoListHeader;

