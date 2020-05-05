import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';


class App extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    // constructor(props) {
    //     super(props);
    //     this.newTaskTitleRef = React.createRef();
    // };
    state = {
        tasks: [
            { id: 0, isDone: true, title: "CSS", priority: "low" },
            { id: 1, isDone: false, title: "JS", priority: "low" },
            { id: 2, isDone: false, title: "ReactJS", priority: "high" },
            { id: 3, isDone: true, title: "Patterns", priority: "high" }
        ],

        filterValue: "All"
    };

    nextTaskId = 6;

    addTask = (newTitle) => {
        //let newText = this.newTaskTitleRef.current.value;
        //this.newTaskTitleRef.current.value = '';
        let newTask = {
            id: this.nextTaskId,
            isDone: false,
            title:  newTitle,
            priority: 'low'
        }

        this.nextTaskId++;//---по длинне массива можно брать
        let newTasks = [...this.state.tasks, newTask];
        this.setState ({ tasks: newTasks });
        
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeStatus = (taskId, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return {...t, isDone: isDone}
            }
            return t
        })
        this.setState({tasks: newTasks})
    };

    changeTitle = (taskId, title) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return {...t, title: title}
            }
            return t
        })
        this.setState({tasks: newTasks})
    };

    render = () => {

        let filteredTasks = 
            this.state.tasks.filter(t => {
                // eslint-disable-next-line default-case
                switch (this.state.filterValue){
                    case 'Active':
                        return !t.isDone;
                    case 'Completed':
                        return t.isDone;
                    case 'All':
                            return true;
                    default:
                        return true;
                }});

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask = {this.addTask}/>
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

export default App;

