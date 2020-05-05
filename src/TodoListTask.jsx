import React from 'react';
import PropTypes from 'prop-types';


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
            </div>
        );
    }
}

export default TodoListTask;

TodoListTask.propTypes = {
    title: PropTypes.string,
    priority: PropTypes.string,
};
