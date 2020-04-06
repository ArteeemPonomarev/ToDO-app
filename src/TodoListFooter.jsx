import React from 'react';


class TodoListFooter extends React.Component {
    render = () => {
        return (
        <div className="todoList-footer">
            <button className = "filter-active">All</button>
            <button className = "filter-active">Completed</button>
            <button className = "filter-active">Active</button>
        </div>     
        );
    }
}

export default TodoListFooter;

