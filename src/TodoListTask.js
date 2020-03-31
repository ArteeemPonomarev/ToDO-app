import React from 'react';


class TodoListTask extends React.Component {
    render = (props) => {
        return (
            <div className="todoList-task">
                <input type={this.props.type} checked={this.props.bool}/>
                <span>{this.tech}</span>
            </div>      
        );
    }
}

export default TodoListTask;

