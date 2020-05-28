import React from 'react';
import AddNewItemForm from './AddNewItemForm';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";


class TodoList extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    // constructor(props) {
    //     super(props);
    //     this.newTaskTitleRef = React.createRef();
    // };
    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [
            // { id: 0, isDone: true, title: "CSS", priority: "low" },
            // { id: 1, isDone: false, title: "JS", priority: "low" },
            // { id: 2, isDone: false, title: "ReactJS", priority: "high" },
            // { id: 3, isDone: true, title: "Patterns", priority: "high" }
        ],

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
        this.props.addTask(this.props.id, newTask)
       // this.nextTaskId++;//---по длинне массива можно брать
        //let newTasks = [...this.state.tasks, newTask];
       /// this.setState({tasks: newTasks}, this.saveState);
        //this.setState принимает вторым параметром callback,который изменится строго после того, как изменится state
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    };

    changeTask = (taskId, newPropobj) => {
        // let newTasks = this.state.tasks.map(t => {
        //     if (t.id === taskId) {
        //         return {...t, ...newPropobj}
        //     }
        //     return t
        // })
        // this.setState({tasks: newTasks}, this.saveState)
        this.props.changeTask(this.props.id, taskId, newPropobj)
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})
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
                // eslint-disable-next-line default-case
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
                        <TodoListTitle headerName={this.props.title}/>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks tasks={filteredTasks}
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
            let action = {
                type: 'ADD_TASK',
                todolistId,
                newTask
            }
            dispatch(action)
        },
        changeTask: (todolistId, taskId, obj) => {
            let action = {
                type: 'CHANGE_TASK',
                taskId,
                obj
            }
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps)(TodoList);

