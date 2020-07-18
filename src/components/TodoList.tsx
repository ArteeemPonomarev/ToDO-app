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
import {TaskType} from "../types/entities";
import {AppStateType} from "../store/store";


type MapDispatchToPropsType = {
    addTask: (todolistId: string, newTitle: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTask: (newTask: TaskType, todolistId: string) => void
    getTasks: (todolistId: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

type StateType = {
    filterValue: string
}

type OwnPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
}


class TodoList extends React.Component<OwnPropsType & MapDispatchToPropsType, StateType> {
    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTasks(this.props.id);
    }

    state = {
        filterValue: 'All'
    };

    addTask = (newTitle: string): void => {
        this.props.addTask(this.props.id, newTitle)
    };

    changeFilter = (newFilterValue: string): void => {
        this.setState({filterValue: newFilterValue})
    };

    changeTask = (newTask: TaskType): void => {
        this.props.changeTask(newTask, this.props.id)
    };

    changeStatus = (newTask: TaskType, status: boolean) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0})
    };

    changeTitle = (newTask: TaskType, newTitle: string) => {
        this.changeTask({...newTask, title: newTitle})
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }

    deleteTask = (taskId: string) => {
        this.props.deleteTask(this.props.id, taskId)
    }

    changeTodolistTitle = (title: string) => {
        this.props.changeTodolistTitle(title, this.props.id)
    }

    render = () => {

        let {tasks = []} = this.props

        let filteredTasks =
            tasks.filter(t => {
                switch (this.state.filterValue) {
                    case 'Active':
                        return t.status === 0;
                    case 'Completed':
                        return t.status === 2;
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        addTask: (todolistId: string, newTitle: string) => {
            dispatch(addTask(newTitle, todolistId))
        },
        deleteTodolist: (todolistId: string) => {
            dispatch(deleteTodolist(todolistId))
        },
        changeTask: (newTask: TaskType, todolistId: string) => {
            dispatch(changeTask(newTask, todolistId))
        },
        getTasks: (todolistId: string) => {
            dispatch(getTasks(todolistId))
        },
        deleteTask: (todolistId: string, taskId: string) => {
            dispatch(deleteTask(todolistId, taskId))
        },
        changeTodolistTitle: (title: string, todolistId: string) => {
            dispatch(changeTodolistTitle(title, todolistId))
        }
    }
}

export default connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>(null, mapDispatchToProps)(TodoList);


