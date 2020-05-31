import React from 'react';
import AddNewItemForm from './AddNewItemForm';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";


class TodoList extends React.Component {

    componentDidMount() {
        //this.restoreState();
    }

    state = {
        tasks: [ ],
        filterValue: 'All'
    };

    nextTaskId = 0;

    //-----метод, который берет данные из стейта и передает в local storage----
    saveState = () => {
        // превращаем в строку, потому что Local storage может принять на хранение только строку
        localStorage.setItem('our-state' + this.props.id, JSON.stringify(this.state))
        //хотим сохранять всякий раз, когда что-то(state) меняем
    }

    //----метод, который берет данный из local storage и устанавливает их в стейт
    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let stateAsString = localStorage.getItem('our-state' + this.props.id);
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1;
                }
            })
        });
        //либо newTaskId помещаем в State и он тоже будет обновляться, после восстановления state
    }

    addTask = (newTitle) => {
        //let newText = this.newTaskTitleRef.current.value;
        //this.newTaskTitleRef.current.value = '';
        let newTask = {
            id: this.nextTaskId,
            isDone: false,
            title: newTitle,
            priority: 'low'
        }
        this.nextTaskId++;
        this.props.addTask(this.props.id, newTask)
       // this.nextTaskId++;//---по длинне массива можно брать
        //let newTasks = [...this.state.tasks, newTask];
       /// this.setState({tasks: newTasks}, this.saveState);
        //this.setState принимает вторым параметром callback,который изменится строго после того, как изменится state
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeTask = (taskId, newPropobj) => {
        this.props.changeTask(this.props.id, taskId, newPropobj)
    };

    changeStatus = (taskId, isDone) => {
        this.props.changeTask(this.props.id,taskId, {isDone: isDone})
    };

    changeTitle = (taskId, newTitle) => {
        this.props.changeTask(this.props.id,taskId, {title: newTitle})
    }

    // changeTitle = (taskId, title) => {
    //     let newTasks = this.state.tasks.map(t => {
    //         if (t.id === taskId) {
    //             return {...t, title: title}
    //         }
    //         return t
    //     })
    //     this.setState({tasks: newTasks})
    // };


    render = () => {


        let filteredTasks =
            this.props.tasks.filter(t => {
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
                                       deleteTodolist={this.props.deleteTodolist}/>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks tasks={filteredTasks}
                                   id={this.props.id}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}/>
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
        addTask: (todolistId,newTask) => {
            const action = {
                type: 'ADD-TASK',
                todolistId,
                newTask
            }
            dispatch(action)
        },
        changeTask: (todolistId, taskId, obj) => {
            const action = {
                type: 'CHANGE-TASK',
                todolistId,
                taskId,
                obj
            }
            dispatch(action)
        },
        deleteTodolist: (todolistId) => {
            const action = {
                type: 'DELETE-TODOLIST',
                todolistId
            }
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoList);


