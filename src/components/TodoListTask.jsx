import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


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
        this.props.changeStatus(this.props.task.id, event.currentTarget.checked);
    };

    onTitleChanged = (event) => {
        this.props.changeTitle(this.props.task.id, event.currentTarget.value)
    }


    render = () => {
        let classForTask = this.props.task.isDone === true ? 'todoList-task done' : 'todoList-task';

        return (
            <div className={classForTask}>
                <input type="checkbox" checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}
                />
                {this.state.isEditMode
                    ? <input
                        autoFocus={true} //курсор сразу в инпуте
                        onBlur={this.deActivatedEditMode}
                        type='text'
                        value={this.props.task.title}
                        onChange={this.onTitleChanged}/>
                    : <span onClick={this.activatedEditMode}>{this.props.task.id}: {this.props.task.title}</span>
                }
                <span>priority: {this.props.task.priority}</span>
                <button onClick={() => {this.props.deleteTask(this.props.task.id, this.props.todolistId)}}>x</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (taskId, todolistId) => {
            const action = {
                type: 'DELETE-TASK',
                taskId,
                todolistId
            }
            dispatch(action)
        }
    }
}

const ConnectedTodoListTask = connect(null, mapDispatchToProps)(TodoListTask);

export default ConnectedTodoListTask;

TodoListTask.propTypes = {
    title: PropTypes.string,
    priority: PropTypes.string,
};
