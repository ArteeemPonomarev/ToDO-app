import React from 'react';


class TodoListTask extends React.Component {
    render = (props) => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.isDone}/>
                <span>{this.props.title} priority: {this.props.priority}</span>
            </div>      
        );
    }
}

export default TodoListTask;

