import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {deleteTaskAC} from "../store/reducer";


class TodoListTask extends React.Component {

    state = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({
            isEditMode: true
        })
    };

    deActivatedEditMode = () => {
        this.setState({
            isEditMode: false
        })
    };

    onIsDoneChanged = (event) => {
        this.props.changeStatus(this.props.task, event.currentTarget.checked);
    };

    onTitleChanged = (event) => {
        this.props.changeTitle(this.props.task, event.currentTarget.value)
    }



    render = () => {
        let isStatus = this.props.task.status === 2

        let classForTask = isStatus ? 'todoList-task done' : 'todoList-task';

        return (
            <div className={classForTask}>
                <input type="checkbox" checked={isStatus}
                       onChange={this.onIsDoneChanged}
                />
                {this.state.isEditMode
                    ? <input
                        autoFocus={true} //курсор сразу в инпуте
                        onBlur={this.deActivatedEditMode}
                        type='text'
                        value={this.props.task.title}
                        onChange={this.onTitleChanged}/>
                    : <span onClick={this.activatedEditMode}>{this.props.task.title} </span>
                }
                <span>priority: {this.props.task.priority}</span>
                <button onClick={() => {this.props.deleteTask(this.props.task.id, this.props.todolistId)}}>x</button>
            </div>
        );
    }
}





export default TodoListTask;

TodoListTask.propTypes = {
    title: PropTypes.string,
    priority: PropTypes.string,
};
