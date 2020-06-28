import React from 'react';
import AddNewItemForm from './AddNewItemForm';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {
    addTask, changeTask,
    changeTodolistTitle, deleteTask,
    deleteTodolist, getTasks,
} from "../store/reducer";
import {api} from "../api";


class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTasks(this.props.id);
    }

    state = {
        filterValue: 'All'
    };


    addTask = (newTitle) => {
        this.props.addTask(this.props.id, newTitle)
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeTask = (newTask) => {
        this.props.changeTask(newTask, this.props.id)
    };

    changeStatus = (newTask, status) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0})
    };

    changeTitle = (newTask, newTitle) => {
        this.changeTask({...newTask, title: newTitle})
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    }

    changeTodolistTitle = (title) => {
        this.props.changeTodolistTitle(title, this.props.id)
    }

    render = () => {

        let {tasks = []} = this.props

        let filteredTasks =
            tasks.filter(t => {
                switch (this.state.filterValue) {
                    case 'Active':
                        return !t.isDone;
                    case 'Completed':
                        return t.isDone;
                    case 'All':
                        return true;
                    default:
                        return true;
                }
            });

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle title={this.props.title}
                                       id={this.props.id}
                                       deleteTodolist={this.deleteTodolist}
                                       changeTodolistTitle={this.changeTodolistTitle}/>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks tasks={filteredTasks}
                                   id={this.props.id}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   deleteTask={this.deleteTask}/>
                    <TodoListFooter filterValue={this.state.filterValue}
                                    changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todolistId, newTitle) => {
            dispatch(addTask(newTitle, todolistId))
        },
        deleteTodolist: (todolistId) => {
            dispatch(deleteTodolist(todolistId))
        },
        changeTask: (newTask,todolistId) => {
            dispatch(changeTask(newTask, todolistId))
        },
        getTasks: (todolistId) => {
            dispatch(getTasks(todolistId))
        },
        deleteTask: (todolistId, taskId) => {
            dispatch(deleteTask(todolistId, taskId))
        },
        changeTodolistTitle: (title, todolistId) => {
            dispatch(changeTodolistTitle(title, todolistId))
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoList);


