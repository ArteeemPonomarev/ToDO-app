import React from 'react';
import AddNewItemForm from './AddNewItemForm';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC, updateTaskAC} from "../store/reducer";
import {api} from "../api";


class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.getTasks(this.props.id)
            .then(res => {
            if (!res.error) {
                this.props.setTasks(this.props.id, res.items)
            }
        })
    }

    state = {
        filterValue: 'All'
    };


    addTask = (newTitle) => {
        api.addTask(newTitle, this.props.id)
            .then(res => {
                if (res.resultCode === 0) {
                    this.props.addTask(this.props.id, res.data.item);
                }
            });
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeTask = (newTask) => {
        api.changeTask(newTask, this.props.id)
            .then(res => {
                debugger
                if (res.resultCode === 0) {
                    this.props.updateTask(res.data.item)
                }
            })
    };

    changeStatus = (newTask, status) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0})
    };

    changeTitle = (newTask, newTitle) => {
        this.changeTask({...newTask, title: newTitle})
    }

    deleteTodolist = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                if (res.resultCode === 0) {
                    this.props.deleteTodolist(this.props.id);
                }
            });
    }

    deleteTask = (taskId) => {
        api.deleteTask(taskId, this.props.id)
            .then(res => {
                if (res.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId);
                }
            });
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
                        <TodoListTitle headerName={this.props.title}
                                       id={this.props.id}
                                       deleteTodolist={this.deleteTodolist}/>
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
        addTask: (todolistId, newTask) => {
            dispatch(addTaskAC(todolistId, newTask))
        },
        deleteTodolist: (todolistId) => {
            dispatch(deleteTodolistAC(todolistId))
        },
        updateTask: (newTask) => {
            dispatch(updateTaskAC(newTask))
        },
        setTasks: (todolistId, tasks) => {
            dispatch(setTasksAC(todolistId, tasks))
        },
        deleteTask: (todolistId, taskId) => {
            dispatch(deleteTaskAC(todolistId, taskId))
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoList);


