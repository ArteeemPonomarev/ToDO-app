import React from 'react';
import PropTypes from 'prop-types';


class TodoListTask extends React.Component {

    state = {
        isEditMode: false,
        title: this.props.task.title
    };

    activatedEditMode = () => {
        this.setState({
            isEditMode: true
        })
    };

    deActivatedEditMode = () => {
        this.setState({ isEditMode: false });
        this.props.changeTitle(this.props.task, this.state.title)
    };

    onIsDoneChanged = (event) => {
        this.props.changeStatus(this.props.task, event.currentTarget.checked);
    };

    onTitleChanged = (event) => {
        this.setState({title: event.currentTarget.value})
    }



    render = () => {
        let isStatus = this.props.task.status === 2
        let classForTask = isStatus ? 'todoList-task done' : 'todoList-task';
        let priorityTitle = '';
        switch (this.props.task.priority) {
            case 0: priorityTitle = 'Low'; break;
            case 1: priorityTitle = 'Middle'; break;
            case 2: priorityTitle = 'High'; break;
            case 3: priorityTitle = 'Urgently'; break;
            case 4: priorityTitle = 'Later'; break;
            default: priorityTitle = 'Low';
        }

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
                        value={this.state.title}
                        onChange={this.onTitleChanged}/>
                    : <span onClick={this.activatedEditMode}>{this.props.task.title} </span>
                }
                <span>priority: {priorityTitle}</span>
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
