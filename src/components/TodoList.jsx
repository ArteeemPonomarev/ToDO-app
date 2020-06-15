import React from 'react';
import AddNewItemForm from './AddNewItemForm';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC, updateTaskAC} from "../store/reducer";
import axios from 'axios';


class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`, {
            withCredentials: true,
            headers: {'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
        }).then(res => {
            if (!res.data.error) {
                this.props.setTasks(this.props.id, res.data.items)
            }
        })
    }

    state = {
        filterValue: 'All'
    };


    addTask = (newTitle) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`, {
                title: newTitle
            },
            {
                withCredentials: true,
                headers: {'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
            })
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.addTask(this.props.id, res.data.data.item);
                }
            });
        // let newTask = {
        //     id: this.nextTaskId,
        //     isDone: false,
        //     title: newTitle,
        //     priority: 'low'
        // }
        //this.nextTaskId++;
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeTask = (newTask) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${newTask.id}`,
            newTask,
            {
            withCredentials: true,
            headers: {'API-KEY' : '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
        })
            .then(res => {
            debugger
            if (res.data.resultCode === 0) {
                this.props.updateTask(res.data.data.item)
            }
        })
    };

    changeStatus = (newTask, status) => {
        this.changeTask( {...newTask, status: status === true ? 2 : 0})
    };

    changeTitle = (newTask, newTitle) => {
        this.changeTask( { ...newTask, title: newTitle})
    }

    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`, {
            withCredentials: true,
            headers: {'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    debugger
                    this.props.deleteTodolist(this.props.id);
                }
            });
    }

    deleteTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`, {
            withCredentials: true,
            headers: {'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id,taskId);
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


